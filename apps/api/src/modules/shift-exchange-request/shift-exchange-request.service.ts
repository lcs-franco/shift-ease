import { ScheduleShiftsService } from '@modules/schedule-shifts/schedule-shifts.service'
import { UsersService } from '@modules/users/users.service'
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ShiftExchangeRequestRepository } from '@shared/database/repositories/shift-exchange-requests.repositories'
import { CreateShiftExchangeRequestDto } from './dto/create-shit-exchange-request.dto'

@Injectable()
export class ShiftExchangeRequestService {
  constructor(
    private readonly shiftExchangeRequestRepo: ShiftExchangeRequestRepository,
    private readonly usersService: UsersService,
    private readonly scheduleShiftsService: ScheduleShiftsService,
  ) {}

  async create(
    createShiftExchangeRequestDto: CreateShiftExchangeRequestDto,
    userId: string,
  ) {
    const { receptorId, departmentId, originShiftId, destinationId, reason } =
      createShiftExchangeRequestDto

    const receptorIdExists = await this.usersService.getUserById(receptorId)
    if (!receptorIdExists)
      throw new NotFoundException('Receptor user not found')

    return this.shiftExchangeRequestRepo.create({
      data: {
        applicant_id: userId,
        receptor_id: receptorId,
        department_id: departmentId,
        origin_shift_id: originShiftId,
        destination_id: destinationId,
        reason,
      },
    })
  }

  async findByUser(userId: string) {
    return this.shiftExchangeRequestRepo.findMany({
      where: {
        OR: [{ applicant_id: userId }, { receptor_id: userId }],
      },
      include: {
        origin_shift: true,
        destination_shift: true,
        applicant: true,
        receptor: true,
      },
    })
  }

  async count(userId: string) {
    return this.shiftExchangeRequestRepo.count({
      where: {
        OR: [{ applicant_id: userId }, { receptor_id: userId }],
        status: { in: ['PENDING', 'APPROVED_RECEIVER'] },
      },
    })
  }

  async acceptRequest(shiftExchangeRequestId: string, userId: string) {
    const requestExists = await this.shiftExchangeRequestRepo.findUnique({
      where: { id: shiftExchangeRequestId },
    })
    if (
      !requestExists ||
      requestExists.receptor_id !== userId ||
      requestExists.status !== 'PENDING'
    )
      throw new ForbiddenException("Can't accept this request")

    const originScheduleShift = await this.scheduleShiftsService.findFirst(
      requestExists.origin_shift_id,
    )
    const destinationScheduleShift = await this.scheduleShiftsService.findFirst(
      requestExists.destination_id,
    )

    if (!originScheduleShift || !destinationScheduleShift)
      throw new NotFoundException('Schedule shifts not found')

    await Promise.all([
      this.scheduleShiftsService.swapScheduleShift(
        requestExists.origin_shift_id,
        requestExists.destination_id,
      ),
      this.scheduleShiftsService.swapScheduleShift(
        requestExists.destination_id,
        requestExists.origin_shift_id,
      ),
    ])

    return this.shiftExchangeRequestRepo.update({
      data: { status: 'APPROVED_MANAGER', end_date: new Date() },
      where: { id: shiftExchangeRequestId },
    })
  }

  async rejectRequest(shiftExchangeRequestId: string, userId: string) {
    const requestExists = await this.shiftExchangeRequestRepo.findUnique({
      where: { id: shiftExchangeRequestId },
    })
    if (
      !requestExists ||
      requestExists.receptor_id !== userId ||
      requestExists.status !== 'PENDING'
    )
      throw new ForbiddenException("Can't reject this request")

    return this.shiftExchangeRequestRepo.update({
      data: { status: 'REJECTED', end_date: new Date() },
      where: { id: shiftExchangeRequestId },
    })
  }

  async approveRequest(shiftExchangeRequestId: string) {
    const requestExists = await this.shiftExchangeRequestRepo.findUnique({
      where: { id: shiftExchangeRequestId },
    })
    if (!requestExists || requestExists.status !== 'APPROVED_RECEIVER')
      throw new ForbiddenException("Can't approve this request")

    const originScheduleShift = await this.scheduleShiftsService.findFirst(
      requestExists.origin_shift_id,
    )
    const destinationScheduleShift = await this.scheduleShiftsService.findFirst(
      requestExists.destination_id,
    )

    if (!originScheduleShift || !destinationScheduleShift)
      throw new NotFoundException('Schedule shifts not found')

    await Promise.all([
      this.scheduleShiftsService.swapScheduleShift(
        requestExists.origin_shift_id,
        requestExists.destination_id,
      ),
      this.scheduleShiftsService.swapScheduleShift(
        requestExists.destination_id,
        requestExists.origin_shift_id,
      ),
    ])

    return this.shiftExchangeRequestRepo.update({
      data: { status: 'APPROVED_MANAGER', end_date: new Date() },
      where: { id: shiftExchangeRequestId },
    })
  }

  async denyRequest(shiftExchangeRequestId: string) {
    const requestExists = await this.shiftExchangeRequestRepo.findUnique({
      where: { id: shiftExchangeRequestId },
    })
    if (!requestExists || requestExists.status !== 'APPROVED_RECEIVER')
      throw new ForbiddenException("Can't deny this request")

    return this.shiftExchangeRequestRepo.update({
      data: { status: 'REJECTED', end_date: new Date() },
      where: { id: shiftExchangeRequestId },
    })
  }
}
