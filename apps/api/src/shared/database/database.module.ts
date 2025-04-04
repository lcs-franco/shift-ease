import { Global, Module } from '@nestjs/common'

import { PrismaService } from './prisma.service'
import { DepartmentsRepository } from './repositories/departments.repositories'
import { ScheduleShiftRepository } from './repositories/schedule-shift.repositories'
import { SchedulesRepository } from './repositories/schedules.repositories'
import { ShiftExchangeRequestRepository } from './repositories/shift-exchange-requests.repositories'
import { ShiftsRepository } from './repositories/shifts.repositories'
import { UsersRepository } from './repositories/users.repositories'

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    DepartmentsRepository,
    SchedulesRepository,
    ShiftsRepository,
    ShiftExchangeRequestRepository,
    ScheduleShiftRepository,
  ],
  exports: [
    UsersRepository,
    DepartmentsRepository,
    SchedulesRepository,
    ShiftsRepository,
    ShiftExchangeRequestRepository,
    ScheduleShiftRepository,
  ],
})
export class DatabaseModule {}
