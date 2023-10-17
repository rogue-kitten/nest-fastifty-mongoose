import {
  IsArray,
  IsEmail,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class createUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'Password should be contain atleast 6 characters',
  })
  password: string;

  @IsNumber()
  @Min(18, {
    message: 'Go ask for your parents approval you child',
  })
  age: number;

  @IsArray()
  @IsString({ each: true })
  hobbies: string[];
}
