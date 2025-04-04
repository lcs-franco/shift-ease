import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { DepartmentsModule } from '@modules/departments/departments.module'
import { env } from 'src/shared/config/env'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    DepartmentsModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '7d' },
      secret: env.jwtSecret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
