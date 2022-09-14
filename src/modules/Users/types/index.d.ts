import { User, Prisma } from "@prisma/client";

export interface GetUserQuery extends Prisma.UserWhereUniqueInput { }

export interface GetUserPostQuery {
  user: User;
}

export interface UpdateUserProps extends Pick<Prisma.UserUpdateInput, "name"> {
  userId: string;
};

export interface UpdateUserEmailProps {
  password: string;
  newEmail: string;
  user: User;
};

export interface UpdateUserPasswordProps {
  currentPassword: string;
  newPassword: string;
  user: User;
};

export interface DeleteUserProps {
  password: string;
  user: User;
};