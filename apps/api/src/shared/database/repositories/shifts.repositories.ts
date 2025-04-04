import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'

@Injectable()
export class ShiftsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.ShiftCreateArgs) {
    return this.prismaService.shift.create(createDto)
  }

  findUnique(findUniqueDto: Prisma.ShiftFindUniqueArgs) {
    return this.prismaService.shift.findUnique(findUniqueDto)
  }

  findMany(findManyDto: Prisma.ShiftFindManyArgs) {
    return this.prismaService.shift.findMany(findManyDto)
  }

  update(updateDto: Prisma.ShiftUpdateArgs) {
    return this.prismaService.shift.update(updateDto)
  }

  delete(deleteDto: Prisma.ShiftDeleteArgs) {
    return this.prismaService.shift.delete(deleteDto)
  }
}
