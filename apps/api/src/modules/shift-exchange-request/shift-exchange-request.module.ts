import { ScheduleShiftsModule } from '@modules/schedule-shifts/schedule-shifts.module'
import { UsersModule } from '@modules/users/users.module'
import { Module } from '@nestjs/common'
import { ShiftExchangeRequestController } from './shift-exchange-request.controller'
import { ShiftExchangeRequestService } from './shift-exchange-request.service'

@Module({
  controllers: [ShiftExchangeRequestController],
  providers: [ShiftExchangeRequestService],
  imports: [UsersModule, ScheduleShiftsModule],
})
export class ShiftExchangeRequestModule {}
