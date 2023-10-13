// Base
import { Module } from '@nestjs/common';

// Actual Module
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

// Other Modules
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

// Misc
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  providers: [UserService, AuthService, JwtStrategy],
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
