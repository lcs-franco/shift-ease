import { Role } from '@modules/users/roles/entities/Role'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { IsPublic } from '@shared/decorators/is-public.decorator'
import { NecessaryRole } from '@shared/decorators/roles.decorator'
import { CreateDepartmentDto } from './dto/create-department.dto'
import { UpdateDepartmentDto } from './dto/update-department.dto'
import { DepartmentsService } from './services/departments.service'

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @ApiBearerAuth()
  @NecessaryRole(Role.ADMIN)
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto)
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.departmentsService.findAll()
  }

  @ApiBearerAuth()
  @NecessaryRole(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.update(id, updateDepartmentDto)
  }

  @ApiBearerAuth()
  @NecessaryRole(Role.ADMIN)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.departmentsService.remove(id)
  }
}
