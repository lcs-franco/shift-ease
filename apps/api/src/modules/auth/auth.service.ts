import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersRepository } from '@shared/database/repositories/users.repositories'
import { compare, hash } from 'bcryptjs'
import { SigninDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'
import { FindUniqueDepartment } from '@modules/departments/services/findUniqueDepartmet.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly findUniqueDepartment: FindUniqueDepartment,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto

    const user = await this.usersRepo.findUnique({
      where: { email },
    })
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const accessToken = await this.generateAccessToken(user.id, user.role)

    return { accessToken }
  }

  async signup(signupDto: SignupDto) {
    const { name, email, password, departmentCode } = signupDto

    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true },
    })
    if (emailTaken) {
      throw new ConflictException('This e-mail is already in use!')
    }

    const department = await this.findUniqueDepartment.find(
      undefined,
      departmentCode,
    )
    if (!department) throw new NotFoundException('Department not found')

    const hashedPassword = await hash(password, 12)

    const user = await this.usersRepo.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        department_id: department.id,
      },
    })

    const accessToken = await this.generateAccessToken(user.id, user.role)

    return { accessToken }
  }

  private generateAccessToken(userId: string, role: string) {
    return this.jwtService.signAsync({ sub: userId, role })
  }
}
