// Base
import { Injectable } from '@nestjs/common';

// DTO
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Repository
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Entity
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User | undefined> {
    return this.userRepository.save(createUserDto);
  }

  findAll(): Promise<User[] | undefined> {
    return this.userRepository.find();
  }

  findById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: [{ id }],
    });
  }

  update(updateUserDto: UpdateUserDto): Promise<User | undefined> {
    return this.userRepository.save(updateUserDto);
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 1) {
      return 'User Deleted';
    } else return 'User Not Found';
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email: email });
  }

  async getUserByRole(role: UserRole): Promise<User[] | undefined> {
    return this.userRepository.findBy({ role: role });
  }
}
