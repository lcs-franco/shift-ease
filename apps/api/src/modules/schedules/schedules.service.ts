import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { SchedulesRepository } from '@shared/database/repositories/schedules.repositories'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'

@Injectable()
export class SchedulesService {
  constructor(private readonly schedulesRepo: SchedulesRepository) {}

  create(createScheduleDto: CreateScheduleDto) {
    const { name, userId, startDate, endDate } = createScheduleDto

    if (new Date(startDate) >= new Date(endDate))
      throw new BadRequestException('Start date must be earlier then end date')

    return this.schedulesRepo.create({
      data: { name, user_id: userId, start_date: startDate, end_date: endDate },
    })
  }

  findAll(filters: {
    search?: string
    departmentId?: string
    shiftType?: string
    from?: Date
    to?: Date
  }) {
    const where: any = {}

    if (filters.search) {
      where.name = { contains: filters.search, mode: 'insensitive' }
    }

    if (filters.departmentId) {
      where.user = { department_id: filters.departmentId }
    }

    if (filters.shiftType) {
      where.schedule_shifts = { some: { shift: { type: filters.shiftType } } }
    }

    if (filters.from || filters.to) {
      where.schedule_shifts = {
        some: {
          ...where.schedule_shifts?.some,
          date: {
            gte: filters.from ? new Date(filters.from) : undefined,
            lte: filters.to ? new Date(filters.to) : undefined,
          },
        },
      }
    }

    return this.schedulesRepo.findMany({
      where,
      include: {
        schedule_shifts: {
          where: {
            date: {
              gte: filters.from ? new Date(filters.from) : undefined,
              lte: filters.to ? new Date(filters.to) : undefined,
            },
          },
          include: {
            shift: true,
          },
        },
      },
    })
  }

  async findOne(id: string) {
    const schedule = await this.schedulesRepo.findUnique({ where: { id } })
    if (!schedule) throw new NotFoundException('Schedule not found')
  }

  update(id: string, updateScheduleDto: UpdateScheduleDto) {
    const { name, userId, startDate, endDate } = updateScheduleDto
    if (startDate && endDate)
      if (new Date(startDate) >= new Date(endDate))
        throw new BadRequestException(
          'Start date must be earlier then end date',
        )

    return this.schedulesRepo.update({
      data: { name, user_id: userId, start_date: startDate, end_date: endDate },
      where: { id },
    })
  }

  async remove(id: string) {
    await this.schedulesRepo.delete({ where: { id } })

    return
  }
}
