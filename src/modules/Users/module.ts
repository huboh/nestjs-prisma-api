import { Module } from "@nestjs/common";
import { UsersService } from "./service";
import { UsersController } from "./controller";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule { }