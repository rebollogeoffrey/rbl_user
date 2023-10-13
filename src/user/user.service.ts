// Base
import { Injectable } from '@nestjs/common';

// DTO
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Repository
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Entity
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  findAll() {
    const result = this.userRepository.find();
    console.log('result :>> ', result);
    return result ? result : 'None found';
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      where: [{ id }],
    })
      ? this.userRepository.findOne({
          where: [{ id }],
        })
      : 'User unfound';
  }

  update(updateUserDto: UpdateUserDto) {
    return this.userRepository.save(updateUserDto);
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email: email });
  }
}
