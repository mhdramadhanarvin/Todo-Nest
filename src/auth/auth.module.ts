import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/auth.config';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [JwtModule.register(jwtConfig), UsersModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
