import { IsNotEmpty, Length, IsStrongPassword, IsEmail } from 'class-validator';

export class LoginUserDto {
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
