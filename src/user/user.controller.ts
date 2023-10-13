//Base
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  // UseGuards,
  Put,
} from '@nestjs/common';

// Service
import { UserService } from './user.service';

// DTO
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Guard
// import { AuthGuard } from '@nestjs/passport';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Get('role')
  getUserByRole(@Body() body) {
    console.log('body :>> ', body);
    return this.userService.getUserByRole(body.role);
  }

  @Get('email')
  getUserByEmail(@Body() userBody) {
    return this.userService.getUserByEmail(userBody.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updatedUser: CreateUserDto) {
    const updateUserDto: UpdateUserDto = { id, ...updatedUser };
    return this.userService.update(updateUserDto);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
