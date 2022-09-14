import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

import { PostsService } from "./service";
import { OnlyAuthorGuard } from "./Guards";
import { PostsController } from "./controller";

const OnlyAuthorGuard_ = { provide: APP_GUARD, useClass: OnlyAuthorGuard };

@Module({
  providers: [PostsService, OnlyAuthorGuard_],
  controllers: [PostsController],
})
export class PostsModule { }