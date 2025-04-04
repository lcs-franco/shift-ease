import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { ShiftType } from '../entities/ShiftType'

export class CreateShiftDto {
  @IsNotEmpty()
  @IsString()
  departmentCode: string

  @IsNotEmpty()
  @IsEnum(ShiftType)
  type: ShiftType
}
