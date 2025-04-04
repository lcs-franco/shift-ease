import { FindUniqueDepartment } from '@modules/departments/services/findUniqueDepartmet.service'
import { Injectable, NotFoundException } from '@nestjs/common'
import { ShiftsRepository } from '@shared/database/repositories/shifts.repositories'
import { CreateShiftDto } from '../dto/create-shift.dto'
import { UpdateShiftDto } from '../dto/update-shift.dto'
import { FindShiftService } from './findShift.service'

@Injectable()
export class ShiftsService {
  constructor(
    private readonly shiftsRepo: ShiftsRepository,
    private readonly findShiftService: FindShiftService,
    private readonly findUniqueDepartmet: FindUniqueDepartment,
  ) {}

  async create(createShiftDto: CreateShiftDto) {
    const { departmentCode, type } = createShiftDto

    const departmentExists = await this.findUniqueDepartmet.find(
      undefined,
      departmentCode,
    )

    if (!departmentExists) throw new NotFoundException('Department not found')

    const shift = this.shiftsRepo.create({
      data: {
        department_id: departmentExists.id,
        type,
      },
      include: {
        department: true,
      },
    })

    return shift
  }

  findAll(departmentId?: string) {
    return this.shiftsRepo.findMany({
      where: departmentId ? { department_id: departmentId } : undefined,
      include: {
        department: true,
      },
    })
  }

  async findOne(id: string) {
    const shift = await this.findShiftService.find(id)
    if (!shift) throw new NotFoundException('Shift not found')

    return shift
  }

  async update(id: string, updateShiftDto: UpdateShiftDto) {
    await this.findOne(id)

    return this.shiftsRepo.update({
      where: { id },
      data: { type: updateShiftDto.type },
      include: {
        department: true,
      },
    })
  }

  async remove(id: string) {
    await this.findOne(id)

    // const scheduleShifts = //! busca scheduleShift
    // if(scheduleShifts) throw new BadRequestException('This shift have a ScheduleShift vinculated')

    // const scheduleShiftsRequest = //! busca scheduleShift
    // if(scheduleShifts) throw new BadRequestException('This shift have a ScheduleShiftRequest vinculated')

    await this.shiftsRepo.delete({ where: { id } })

    return
  }
}
