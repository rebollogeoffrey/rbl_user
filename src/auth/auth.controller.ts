// Base
import { Controller, Post, Body } from '@nestjs/common';

// Service
import { AuthService } from './auth.service';

// Entity
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: User): Promise<any> {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<any> {
    return this.authService.register(user);
  }

  @Post('account')
  async modify(@Body() user: UpdateUserDto): Promise<any> {
    return this.authService.changePassword(user);
  }
}
