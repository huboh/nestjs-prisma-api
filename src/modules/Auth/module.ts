import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { Global, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { AuthService } from "./service";
import { JwtAuthGuard } from "./Guards";
import { JwtStrategy } from "./Strategies";
import { AuthController } from "./controller";

const JwtModule_ = JwtModule.register({});
const PassportModule_ = PassportModule.register({});
const AuthGaurds_ = { provide: APP_GUARD, useClass: JwtAuthGuard };

@Global()
@Module({
  imports: [JwtModule_, PassportModule_],
  providers: [AuthService, AuthGaurds_, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }