import { IsString, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class ContactDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsPhoneNumber("NG")
  phoneNumber: string;

  constructor(firstName: string, lastName: string, phoneNumber: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }
}
