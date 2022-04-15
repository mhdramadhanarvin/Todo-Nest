import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register(jwtConfig)],
  providers: [AuthService]
})
export class AuthModule {}
