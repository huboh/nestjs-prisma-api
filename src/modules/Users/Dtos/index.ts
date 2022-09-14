import { User } from "../../../types";
import { uuidVersion } from "../../../utils";
import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";

export class GetUserParamDto implements Pick<User, "userId"> {
  @IsUUID(uuidVersion, { message: "invalid user identifier" })
  userId: string;
}

export class UpdateUserDTO implements Pick<User, "name">{
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class DeleteuserDTO {
  @MinLength(6)
  password: string;
}

export class UpdateEmailDTO implements Pick<User, "email">{
  @IsEmail({}, { message: "invalid email address" })
  email: string;

  @MinLength(6)
  password: string;
}

export class UpdatePasswordDTO {
  @MinLength(6)
  newPassword: string;

  @MinLength(6)
  currentPassword: string;
}