import { IsDate, IsNotEmpty, IsString } from 'class-validator'

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  userId: string

  @IsNotEmpty()
  @IsDate()
  startDate: Date

  @IsNotEmpty()
  @IsDate()
  endDate: Date
}
