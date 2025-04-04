import { Module } from '@nestjs/common'
import { DepartmentsController } from './departments.controller'
import { DepartmentsService } from './services/departments.service'
import { FindUniqueDepartment } from './services/findUniqueDepartmet.service'

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService, FindUniqueDepartment],
  exports: [FindUniqueDepartment],
})
export class DepartmentsModule {}
