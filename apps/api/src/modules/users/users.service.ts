import { Injectable } from '@nestjs/common'
import { UsersRepository } from '@shared/database/repositories/users.repositories'
import { Role } from './roles/entities/Role'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  getUserById(userId: string) {
    return this.usersRepo.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department_id: true,
      },
    })
  }

  async findUserSchedules(userId: string) {
    return this.usersRepo.findUnique({
      where: { id: userId },
      omit: { password: true },
      include: {
        schedules: { include: { schedule_shifts: true } },
      },
    })
  }

  updateUserRole(userId: string, role: Role) {
    return this.usersRepo.update({
      data: { role },
      where: { id: userId },
      select: { name: true, role: true },
    })
  }
}
