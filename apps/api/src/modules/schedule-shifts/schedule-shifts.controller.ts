import { Controller } from '@nestjs/common'
import { ScheduleShiftsService } from './schedule-shifts.service'

@Controller('schedule-shifts')
export class ScheduleShiftsController {
  constructor(private readonly scheduleShiftsService: ScheduleShiftsService) {}
}
