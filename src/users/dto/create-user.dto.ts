import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsDateString, IsEnum } from 'class-validator';
import { ROLE } from '../enums/users.enums'

export class CreateUserDto {

    @MinLength(6, { message: 'full name must be at least 3 characters long' })
    name: string;

    @IsEmail({}, { message: 'Invalid email address' })
    email: string

    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;

    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    confirm_password: string;

    @IsString()
    location: string;

    @IsString()
    company_name: string

    @IsDateString()
    birth_date: Date;

    @IsEnum(ROLE, { message: 'Invalid user role' })
    role: ROLE;
}


