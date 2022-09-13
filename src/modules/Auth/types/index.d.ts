import { User } from "../../../types";
import { Prisma } from "@prisma/client";

export interface AuthToken extends Pick<User, "userId"> { }

export interface LoginCredentials extends Pick<User, "email" | "password"> { }

export interface SignupCredentials extends Pick<User, "name" | "email" | "password"> { }

export interface GetUserQuery extends Prisma.UserWhereUniqueInput { }