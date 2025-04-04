import { PartialType } from '@nestjs/mapped-types'
import { CreateShiftDto } from './create-shift.dto'
import { IsEnum, IsOptional } from 'class-validator'
import { ShiftType } from '../entities/ShiftType'

export class UpdateShiftDto extends PartialType(CreateShiftDto) {
  @IsOptional()
  @IsEnum(ShiftType)
  type?: ShiftType
}
