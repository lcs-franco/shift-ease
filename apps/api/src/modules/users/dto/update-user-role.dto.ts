import { IsEnum, IsNotEmpty } from 'class-validator'
import { Role } from '../roles/entities/Role'

export class UpdateUserRoleDto {
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role
}
