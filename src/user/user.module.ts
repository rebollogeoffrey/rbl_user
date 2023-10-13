// Base
import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';

// Actual Module
import { UserService } from './user.service';
import { UserController } from './user.controller';

// Entity
import { User } from './entities/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
