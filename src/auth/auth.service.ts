// Base
import { Injectable } from '@nestjs/common';

// DTO
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

// Other Service
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

// Misc
import * as crypto from 'crypto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validate the user in parameter
   */
  async validate(email: string): Promise<any> {
    return this.userService.getUserByEmail(email);
  }

  /**
   * Try to login the user in parameter.
   * Return an access token if login is successfull otherwise return
   * a 404 status
   * @param user
   */
  public async login(user: LoginUserDto): Promise<any | { status: number }> {
    return this.validate(user.email).then((userData) => {
      // User not found
      if (!userData) {
        return { status: 404 };
      }
      // Password doesn't match
      else if (userData.password != this.hash(user.password)) {
        return { message: 'This email or password is incorrect.' };
      }

      // User found
      // The access token will be composed by the email
      const payload = `${userData.email}`;
      const accessToken = this.jwtService.sign(payload);

      return {
        expires_in: 3600, // 1hour
        access_token: accessToken,
      };
    });
  }

  public async register(user: CreateUserDto): Promise<any> {
    user.password = this.hash(user.password);

    return this.userService.create(user);
  }

  public async changePassword(user: UpdateUserDto): Promise<any> {
    user.password = this.hash(user.password);

    return this.userService.update(user);
  }

  /**
   * Hash the password in parameter.
   */
  private hash(password): string {
    return crypto.createHmac('sha256', password).digest('hex');
  }
}
