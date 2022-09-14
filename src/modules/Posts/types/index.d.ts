import { User } from "../../../types";
import { Prisma } from "@prisma/client";

export interface GetPostQuery extends Prisma.PostWhereUniqueInput {

}

export interface GetPostsQuery extends Prisma.PostWhereInput {
  limit?: number;
  skip?: number;
}

export interface CreatePostProps {
  postData: Omit<Prisma.PostCreateInput, "author" | "postId">;
  user: User,
}

export interface UpdatePostProps {
  postUpdates: Omit<Prisma.PostCreateInput, "author" | "postId">;
  postId: string;
}

export interface DeletePostProps {
  postId: string;
}