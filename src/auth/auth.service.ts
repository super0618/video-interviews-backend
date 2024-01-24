import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    // Example method to generate a JWT token
    async generateToken(payload: any): Promise<string> {
        return this.jwtService.sign(payload);
    }

    // Example method to verify a JWT token
    async verifyToken(token: string): Promise<any> {
        return this.jwtService.verify(token);
    }
}