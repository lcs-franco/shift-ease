import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'

@Injectable()
export class ShiftExchangeRequestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.ShiftExchangeRequestCreateArgs) {
    return this.prismaService.shiftExchangeRequest.create(createDto)
  }

  findUnique(findUniqueDto: Prisma.ShiftExchangeRequestFindUniqueArgs) {
    return this.prismaService.shiftExchangeRequest.findUnique(findUniqueDto)
  }

  findMany(findManyDto: Prisma.ShiftExchangeRequestFindManyArgs) {
    return this.prismaService.shiftExchangeRequest.findMany(findManyDto)
  }

  update(updateDto: Prisma.ShiftExchangeRequestUpdateArgs) {
    return this.prismaService.shiftExchangeRequest.update(updateDto)
  }

  delete(deleteDto: Prisma.ShiftExchangeRequestDeleteArgs) {
    return this.prismaService.shiftExchangeRequest.delete(deleteDto)
  }

  count(countDto: Prisma.ShiftExchangeRequestCountArgs) {
    return this.prismaService.shiftExchangeRequest.count(countDto)
  }
}
