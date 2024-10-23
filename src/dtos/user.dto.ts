import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  minLength,
  MinLength,
} from "class-validator";

export class UserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
