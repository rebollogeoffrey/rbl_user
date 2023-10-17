import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsStrongPassword,
  IsString,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsEnum(UserRole)
  readonly role: UserRole;

  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(1, 255)
  readonly email: string;

  @IsStrongPassword({
    minLength: 5,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Length(5, 255)
  @IsNotEmpty()
  password: string;
}
