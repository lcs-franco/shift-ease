import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common'

import { ApiBearerAuth } from '@nestjs/swagger'
import { ActiveUserId } from '@shared/decorators/ActiveUserId'
import { NecessaryRole } from '@shared/decorators/roles.decorator'
import { UpdateUserRoleDto } from './dto/update-user-role.dto'
import { Role } from './roles/entities/Role'
import { UsersService } from './users.service'

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  me(@ActiveUserId() userId: string) {
    return this.usersService.getUserById(userId)
  }

  @Get('/find-schedules')
  findUserSchedules(@ActiveUserId() userId: string) {
    return this.usersService.findUserSchedules(userId)
  }

  @NecessaryRole(Role.ADMIN)
  @Put('/update-user-role/:userId')
  updateUserRole(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.usersService.updateUserRole(userId, updateUserRoleDto.role)
  }
}
