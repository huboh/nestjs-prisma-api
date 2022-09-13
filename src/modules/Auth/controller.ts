import { Response } from "express";
import { Controller, Post, Body, Res, UseFilters } from "@nestjs/common";

import { Public } from "./Decorators";
import { sendJson } from "src/utils/helpers";
import { AuthService } from "./service";
import { LoginDto, SignupDto } from "./Dtos";
import { PrismaClientExceptionFilter } from "../../utils/nestjs/filters";


@Controller({ path: "/api/auth" })
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post("/login")
  async login(@Res() response: Response, @Body() loginDto: LoginDto) {
    const loginData = await this.authService.login(loginDto);

    sendJson(response, {
      statusCode: 200,
      status: "success",
      data: loginData
    });
  }

  @Public()
  @Post("/signup")
  @UseFilters(PrismaClientExceptionFilter)
  async signup(@Res() response: Response, @Body() signupDto: SignupDto) {
    const signupData = await this.authService.signup(signupDto);

    sendJson(response, {
      statusCode: 201,
      status: "success",
      data: signupData
    });
  }
}