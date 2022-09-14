import { AuthService } from "../Auth/service";
import { DatabaseService } from "../Database/service";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { GetUserQuery, UpdateUserProps, UpdateUserEmailProps, UpdateUserPasswordProps, DeleteUserProps, GetUserPostQuery } from "./types";

@Injectable({})
export class UsersService {
  constructor(private database: DatabaseService, private auth: AuthService) { }

  async getUser(query: GetUserQuery) {
    return this.database.user.findUnique({
      where: query
    });
  }

  async getUserPosts(query: GetUserPostQuery) {
    return this.database.post.findMany({
      where: { authorId: query.user.id }
    });
  }

  async updateUser(props: UpdateUserProps) {
    return this.database.user.update({
      where: { userId: props.userId },
      data: {
        name: props.name
      }
    });
  }

  async updateUserEmail(props: UpdateUserEmailProps) {
    const user = props.user;
    const newEmail = props.newEmail;
    const currentPassword = props.password;
    const passwordsMatch = await this.auth.comparePassword(currentPassword, user.password);

    if (!passwordsMatch) {
      throw new ForbiddenException({ message: "passwords does not match" });
    }

    return this.database.user.update({
      where: { userId: user.userId },
      data: {
        email: newEmail,
        isEmailVerified: false,
      }
    });
  }

  async updateUserPassword(props: UpdateUserPasswordProps) {
    const user = props.user;
    const newPassword = props.newPassword;
    const currentPassword = props.currentPassword;
    const currentPasswordsMatch = await this.auth.comparePassword(currentPassword, user.password);

    if (!currentPasswordsMatch) {
      throw new ForbiddenException({ message: "incorrect password" });
    }

    return this.database.user.update({
      where: { userId: props.user.userId },
      data: {
        password: await this.auth.hashPassword(newPassword)
      }
    });
  }

  async deleteUser(props: DeleteUserProps) {
    const user = props.user;
    const password = props.password;
    const passwordsMatch = await this.auth.comparePassword(password, user.password);

    if (!passwordsMatch) {
      throw new ForbiddenException({ message: "incorrect password" });
    }

    const deleteUserOperation = this.database.user.delete({ where: { userId: user.userId } });
    const deleteUserPostOperation = this.database.post.deleteMany({ where: { authorId: user.id } });

    return this.database.$transaction([deleteUserPostOperation, deleteUserOperation])
      .then(() => true)
      .catch(() => false);
  }
}