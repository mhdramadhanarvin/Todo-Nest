import { JwtModuleOptions } from "@nestjs/jwt";

export const jwtConfig: JwtModuleOptions = {
    secret: 'secret-coy',
    signOptions: {
        expiresIn: 60,
    }
}