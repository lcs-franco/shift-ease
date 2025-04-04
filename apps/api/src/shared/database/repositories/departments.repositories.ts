import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'

@Injectable()
export class DepartmentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.DepartmentCreateArgs) {
    return this.prismaService.department.create(createDto)
  }

  findUnique(findUniqueDto: Prisma.DepartmentFindUniqueArgs) {
    return this.prismaService.department.findUnique(findUniqueDto)
  }

  findMany(findManyDto: Prisma.DepartmentFindManyArgs) {
    return this.prismaService.department.findMany(findManyDto)
  }

  update(updateDto: Prisma.DepartmentUpdateArgs) {
    return this.prismaService.department.update(updateDto)
  }

  delete(deleteDto: Prisma.DepartmentDeleteArgs) {
    return this.prismaService.department.delete(deleteDto)
  }
}
