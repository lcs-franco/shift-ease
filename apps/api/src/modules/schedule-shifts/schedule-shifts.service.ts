import { Injectable, NotFoundException } from '@nestjs/common'
import { ScheduleShiftRepository } from '@shared/database/repositories/schedule-shift.repositories'

@Injectable()
export class ScheduleShiftsService {
  constructor(private readonly scheduleShiftsRepo: ScheduleShiftRepository) {}

  async findFirst(id: string) {
    return this.scheduleShiftsRepo.findFirst({ where: { id } })
  }

  async swapScheduleShift(originId: string, destinationId: string) {
    const destinationScheduleShift = await this.scheduleShiftsRepo.findUnique({
      where: { id: destinationId },
      select: { shift_id: true },
    })

    if (!destinationScheduleShift) {
      throw new NotFoundException('Destination ScheduleShift not found')
    }

    return this.scheduleShiftsRepo.update({
      where: { id: originId },
      data: { shift_id: destinationScheduleShift.shift_id },
    })
  }
}
