// Base
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Other Service
import { AuthService } from './auth.service';

// Entity
// import { User } from '../user/entities/user.entity';

// Misc
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // Configure the strategy
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(email: string) {
    const userFound = await this.authService.validate(email);
    if (!userFound) {
      throw new UnauthorizedException();
    }
    return userFound;
  }
}
