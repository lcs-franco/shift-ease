import { Role } from '@modules/users/roles/entities/Role'
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { ActiveUserId } from '@shared/decorators/ActiveUserId'
import { NecessaryRole } from '@shared/decorators/roles.decorator'
import { CreateShiftExchangeRequestDto } from './dto/create-shit-exchange-request.dto'
import { ShiftExchangeRequestService } from './shift-exchange-request.service'

@ApiBearerAuth()
@Controller('shift-exchange-request')
export class ShiftExchangeRequestController {
  constructor(
    private readonly shiftExchangeRequestService: ShiftExchangeRequestService,
  ) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createShiftExchangeRequestDto: CreateShiftExchangeRequestDto,
  ) {
    return this.shiftExchangeRequestService.create(
      createShiftExchangeRequestDto,
      userId,
    )
  }

  @Get()
  getShiftExchangeRequest(@ActiveUserId() userId: string) {
    return this.shiftExchangeRequestService.findByUser(userId)
  }

  @Get('count')
  count(@ActiveUserId() userId: string) {
    return this.shiftExchangeRequestService.count(userId)
  }

  @Patch(':requestId/accept')
  acceptShiftExchangeRequest(
    @Param('requestId', ParseUUIDPipe) requestId: string,
    @ActiveUserId() userId: string,
  ) {
    return this.shiftExchangeRequestService.acceptRequest(requestId, userId)
  }

  @Patch(':requestId/reject')
  rejectShiftExchangeRequest(
    @Param('requestId', ParseUUIDPipe) requestId: string,
    @ActiveUserId() userId: string,
  ) {
    return this.shiftExchangeRequestService.rejectRequest(requestId, userId)
  }

  @NecessaryRole(Role.MANAGER, Role.ADMIN)
  @Patch(':requestId/approve')
  approveShiftExchangeRequest(
    @Param('requestId', ParseUUIDPipe) requestId: string,
  ) {
    return this.shiftExchangeRequestService.approveRequest(requestId)
  }

  @NecessaryRole(Role.MANAGER, Role.ADMIN)
  @Patch(':requestId/deny')
  denyShiftExchangeRequest(
    @Param('requestId', ParseUUIDPipe) requestId: string,
  ) {
    return this.shiftExchangeRequestService.denyRequest(requestId)
  }
}
