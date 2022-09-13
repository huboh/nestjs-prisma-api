import { LoginCredentials, SignupCredentials } from "../types";
import { IsNotEmpty, IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto implements LoginCredentials {
  @MinLength(6)
  @IsString()
  password: string;

  @IsNotEmpty({ message: "email address in required" })
  @IsEmail(undefined, { message: "invalid email address" })
  email: string;
}

export class SignupDto implements SignupCredentials {
  @MinLength(6)
  @IsString()
  password: string;

  @IsNotEmpty({ message: "email address in required" })
  @IsEmail(undefined, { message: "invalid email address" })
  email: string;

  @MinLength(1)
  @IsString()
  name: string;
}