import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'

@Injectable()
export class ScheduleShiftRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findFirst(findFirstDto: Prisma.ScheduleShiftFindFirstArgs) {
    return this.prismaService.scheduleShift.findFirst(findFirstDto)
  }

  findUnique(findUniqueDto: Prisma.ScheduleShiftFindUniqueArgs) {
    return this.prismaService.scheduleShift.findUnique(findUniqueDto)
  }

  update(updateDto: Prisma.ScheduleShiftUpdateArgs) {
    return this.prismaService.scheduleShift.update(updateDto)
  }
}
