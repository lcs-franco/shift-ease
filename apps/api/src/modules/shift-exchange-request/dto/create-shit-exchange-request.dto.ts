import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateShiftExchangeRequestDto {
  @IsNotEmpty()
  @IsUUID()
  receptorId: string

  @IsNotEmpty()
  @IsUUID()
  departmentId: string

  @IsNotEmpty()
  @IsUUID()
  originShiftId: string

  @IsNotEmpty()
  @IsUUID()
  destinationId: string

  @IsString()
  @IsOptional()
  reason?: string
}
