import { Injectable } from '@nestjs/common'
import { DepartmentsRepository } from '@shared/database/repositories/departments.repositories'

@Injectable()
export class FindUniqueDepartment {
  constructor(private readonly departmentsRepo: DepartmentsRepository) {}

  async find(id?: string, code?: string) {
    return this.departmentsRepo.findUnique({
      where: { id, code },
    })
  }
}
