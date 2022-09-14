import { Post } from "src/types";
import { uuidVersion } from "../../../utils";
import { IsUUID, IsBoolean, IsOptional, IsString, IsNotEmpty } from "class-validator";

export class GetPostDto implements Pick<Post, "postId"> {
  @IsUUID(uuidVersion, { message: "invalid post identifier" })
  postId: string;
}

export class CreatePostDto implements Pick<Post, "title" | "content" | "isPublished"> {
  @IsBoolean()
  @IsOptional()
  isPublished: boolean;

  @IsString()
  content: string;

  @IsString()
  @IsNotEmpty({ message: "title is required" })
  title: string;
}

export class UpdatePostDto extends CreatePostDto { }

export class UpdatePostParamDto {
  @IsUUID(uuidVersion, { message: "invalid post identifier" })
  postId: string;
}

export class DeletePostParamDto {
  @IsUUID(uuidVersion, { message: "invalid post identifier" })
  postId: string;
}