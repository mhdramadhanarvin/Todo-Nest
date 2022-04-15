import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
    secret: 'secreywoii',
    signOptions: {
        expiresIn: 60
    }
}