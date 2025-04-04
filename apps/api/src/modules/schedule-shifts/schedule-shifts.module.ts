import { Module } from '@nestjs/common'
import { ScheduleShiftsController } from './schedule-shifts.controller'
import { ScheduleShiftsService } from './schedule-shifts.service'

@Module({
  controllers: [ScheduleShiftsController],
  providers: [ScheduleShiftsService],
  exports: [ScheduleShiftsService],
})
export class ScheduleShiftsModule {}
