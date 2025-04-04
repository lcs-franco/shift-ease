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
  Query,
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { NecessaryRole } from '@shared/decorators/roles.decorator'
import { CreateShiftDto } from './dto/create-shift.dto'
import { UpdateShiftDto } from './dto/update-shift.dto'
import { ShiftsService } from './services/shifts.service'

@ApiBearerAuth()
@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @NecessaryRole(Role.ADMIN, Role.MANAGER)
  @Post()
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftsService.create(createShiftDto)
  }

  @Get()
  findAll(
    @Query('departmentId', new ParseUUIDPipe({ optional: true }))
    departmentId?: string,
  ) {
    return this.shiftsService.findAll(departmentId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shiftsService.findOne(id)
  }

  @NecessaryRole(Role.ADMIN, Role.MANAGER)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateShiftDto: UpdateShiftDto,
  ) {
    return this.shiftsService.update(id, updateShiftDto)
  }

  @NecessaryRole(Role.ADMIN, Role.MANAGER)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.shiftsService.remove(id)
  }
}
