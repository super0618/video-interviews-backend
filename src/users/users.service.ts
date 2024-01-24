import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginDto } from './dto/login-user.dto'
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity'
import { Model } from 'mongoose';
//importing bcrypt password config 
import { comparePassword, hashPassword } from '../utils/bcrypt'
import { AuthService } from '../auth/auth.service'
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private UserModel: Model<User>,
    private readonly authService: AuthService) { }

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    if (await this.findOne(createUserDto.email)) {
      throw new ConflictException('User already exists');
    }
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }
    createUserDto.password = await hashPassword(createUserDto.password)
    return await this.UserModel.create(createUserDto);
  }

  async findAll(): Promise<User[] | []> {
    return await this.UserModel.find().select('-password');
  }

  async findById(id: string): Promise<User | null> {
    let user: User | null = await (await this.UserModel.findById(id).select('-v -password'))
    if (!user) throw new NotFoundException('user not found')
    return user;
  }
  async findOne(email: string): Promise<User | null> {
    return await this.UserModel.findOne({ email });
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!await this.UserModel.findById(id)) throw new NotFoundException('user not found')
    return await this.UserModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true }
    ).select('-password')
  }

  async remove(id: string): Promise<User | null> {
    return await this.UserModel.findByIdAndRemove(id)
  }
  async login(userLoginDto: UserLoginDto) {
    let user: User | null = await this.findOne(userLoginDto.email)
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (! await comparePassword(userLoginDto.password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }
    return {
      name: user.name,
      email: user.email,
      role: user.role,
      token: await this.authService.generateToken(
        {
          id: user.id,
          role: user.role
        }
      )
    };
  }
}
