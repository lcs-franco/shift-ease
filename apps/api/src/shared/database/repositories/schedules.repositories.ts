import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class SchedulesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.ScheduleCreateArgs) {
    return this.prismaService.schedule.create(createDto)
  }

  findUnique(findUniqueDto: Prisma.ScheduleFindUniqueArgs) {
    return this.prismaService.schedule.findUnique(findUniqueDto)
  }

  findMany(findManyDto: Prisma.ScheduleFindManyArgs) {
    return this.prismaService.schedule.findMany(findManyDto)
  }

  update(updateDto: Prisma.ScheduleUpdateArgs) {
    return this.prismaService.schedule.update(updateDto)
  }

  delete(deleteDto: Prisma.ScheduleDeleteArgs) {
    return this.prismaService.schedule.delete(deleteDto)
  }
}
