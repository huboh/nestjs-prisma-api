import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { PassportModule } from "@nestjs/passport";

import { AuthService } from "./service";
import { JwtAuthGuard } from "./Guards";
import { JwtStrategy } from "./Strategies";
import { AuthController } from "./controller";

const JwtModule_ = JwtModule.register({});
const PassportModule_ = PassportModule.register({});
const AuthGaurds_ = { provide: APP_GUARD, useClass: JwtAuthGuard };

@Module({
  imports: [JwtModule_, PassportModule_],
  providers: [AuthService, AuthGaurds_, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }