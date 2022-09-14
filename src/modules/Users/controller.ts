import { sendJson } from "../../utils";
import { UsersService } from "./service";
import { Response, Request } from "express";
import { Controller, Get, Put, Delete, Param, Body, Res, Req } from "@nestjs/common";
import { GetUserParamDto, UpdateUserDTO, UpdateEmailDTO, UpdatePasswordDTO, DeleteuserDTO } from "./Dtos";

@Controller({ path: "api/users" })
export class UsersController {
  constructor(private usersService: UsersService) { };

  @Get("/me")
  async getMe(@Req() request: Request, @Res() response: Response) {
    sendJson(response, {
      data: {
        me: request.user
      }
    });
  }

  @Get("/:userId")
  async getUser(@Res() response: Response, @Param() params: GetUserParamDto) {
    const user = await this.usersService.getUser({ userId: params.userId });

    sendJson(response, {
      data: {
        user
      }
    });
  }

  @Get("/me/posts")
  async getUserPosts(@Req() request, @Res() response: Response) {
    const user = request.user;
    const posts = await this.usersService.getUserPosts({ user });

    sendJson(response, {
      data: {
        posts
      }
    });
  }

  @Put("/me/update")
  async updateUser(@Req() request, @Res() response: Response, @Body() updates: UpdateUserDTO) {
    const user = request.user;
    const updatedUser = await this.usersService.updateUser({ userId: user.userId, name: updates.name });

    sendJson(response, {
      data: {
        user: updatedUser
      }
    });
  }

  @Put("/me/update/email")
  async updateEmail(@Req() request, @Res() response: Response, @Body() updates: UpdateEmailDTO) {
    const user = request.user;
    const updatedUser = await this.usersService.updateUserEmail({
      user: user,
      newEmail: updates.email,
      password: updates.password
    });

    // TODO: send confirmation email to new email address

    sendJson(response, {
      data: {
        user: updatedUser
      }
    });
  }

  @Put("/me/update/password")
  async updatePassword(@Req() request, @Res() response: Response, @Body() updates: UpdatePasswordDTO) {
    const user = request.user;
    const updatedUser = await this.usersService.updateUserPassword({
      user: user,
      newPassword: updates.newPassword,
      currentPassword: updates.currentPassword,
    });

    sendJson(response, {
      data: {
        user: updatedUser
      }
    });
  }

  @Delete("/me/delete")
  async delete(@Req() request, @Res() response: Response, @Body() deleteUserDto: DeleteuserDTO) {
    const user = request.user;
    const deleted = await this.usersService.deleteUser({
      user: user,
      password: deleteUserDto.password,
    });

    // Todo: send confirmation email with token to registered email address before deleting account

    sendJson(response, {
      data: {
        deleted
      }
    });
  }
}