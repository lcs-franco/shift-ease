import { Module } from '@nestjs/common'
import { ShiftsService } from './services/shifts.service'
import { ShiftsController } from './shifts.controller'
import { DepartmentsModule } from '@modules/departments/departments.module'
import { FindShiftService } from './services/findShift.service'

@Module({
  exports: [FindShiftService],
  imports: [DepartmentsModule],
  controllers: [ShiftsController],
  providers: [ShiftsService, FindShiftService],
})
export class ShiftsModule {}
