import { Response } from "express";
import { PrismaNotFoundExceptionFilter } from "src/utils/nestjs/filters";
import { Controller, Get, Post, Put, Delete, Body, Res, Req, Param, Query, UseFilters, ParseBoolPipe } from "@nestjs/common";

import { sendJson } from "src/utils/helpers";
import { OnlyAuthor } from "./Decorators";
import { PostsService } from "./service";
import { CreatePostDto, GetPostDto, UpdatePostDto, UpdatePostParamDto, DeletePostParamDto } from "./Dtos";

@Controller({ path: "/api/posts/" })
@UseFilters(PrismaNotFoundExceptionFilter)
export class PostsController {
  constructor(private postsService: PostsService) { }

  @Get("/")
  async getPosts(@Req() request, @Res() response: Response, @Query("published", ParseBoolPipe) published) {
    const user = request.user;
    const data = await this.postsService.getPosts({ authorId: user?.id, isPublished: published, limit: 10 });

    sendJson(response, {
      data
    });
  }

  @Get("/:postId")
  async getPost(@Res() response: Response, @Param() params: GetPostDto) {
    const post = await this.postsService.getPost({ postId: params.postId });

    sendJson(response, {
      data: {
        post
      }
    });
  }

  @Post("/new")
  async createPost(@Req() request, @Res() response: Response, @Body() createPostDto: CreatePostDto) {
    const user = request.user;
    const post = await this.postsService.createPost({ user, postData: createPostDto });

    sendJson(response, {
      statusCode: 201,
      data: {
        post
      }
    });
  }

  @Put("/:postId")
  @OnlyAuthor((request) => ({ postId: request.params.postId }))
  async updatePost(@Res() response: Response, @Param() params: UpdatePostParamDto, @Body() postUpdates: UpdatePostDto) {
    const postId = params.postId;
    const updatedPost = await this.postsService.updatePost({ postId, postUpdates });

    sendJson(response, {
      data: {
        post: updatedPost
      }
    });
  }

  @Delete("/:postId")
  @OnlyAuthor((request) => ({ postId: request.params.postId }))
  async deletePost(@Res() response: Response, @Param() params: DeletePostParamDto) {
    const postId = params.postId;
    const deleted = await this.postsService.deletePost({ postId });

    sendJson(response, {
      data: {
        deleted
      }
    });
  }
}