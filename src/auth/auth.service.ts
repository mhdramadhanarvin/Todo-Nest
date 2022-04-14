import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interface/login-response.interface';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UsersService) { }

    async login(loginDto: LoginDto): Promise<string> {
        const { email, password } = loginDto;

        const user = await this.userService.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException("Wrong email or password");
        } 

        const access_token = await this.createAccessToken(user);
        return access_token;
    }

    async createAccessToken(user: User): Promise<string> {
        const payload = {
            sub: user.id
        }

        const access_token = await this.jwtService.signAsync(payload);

        return access_token;
    }


}
