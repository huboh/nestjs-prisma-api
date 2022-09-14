import { createUuid } from "src/utils";
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../Database/service";
import { GetPostQuery, GetPostsQuery, CreatePostProps, UpdatePostProps, DeletePostProps } from "./types";

@Injectable({})
export class PostsService {
  constructor(private database: DatabaseService) { }

  async getPost(query: GetPostQuery) {
    return this.database.post.findFirst({
      where: {
        OR: [{ id: query.id }, { postId: query.postId }]
      },
      include: {
        author: true
      }
    });
  }

  async getPosts(query: GetPostsQuery) {
    const { skip = 0, limit: take = 10, ...where } = query;

    const [posts, total] = await Promise.all([
      this.database.post.findMany({
        where, take, skip, include: { author: true }
      }),
      this.database.post.count({
        where,
      })
    ]);

    return {
      total,
      posts
    };
  }

  async createPost(props: CreatePostProps) {
    const user = props.user;
    const uuid = createUuid();

    return this.database.post.create({
      data: {
        isPublished: props.postData.isPublished,
        content: props.postData.content,
        title: props.postData.title,
        postId: uuid,
        author: {
          connect: {
            id: user.id,
          }
        }
      }
    });
  }

  async updatePost(props: UpdatePostProps) {
    return this.database.post.update({
      where: { postId: props.postId },
      data: {
        isPublished: props.postUpdates.isPublished,
        content: props.postUpdates.content,
        title: props.postUpdates.title,
      }
    });
  }

  async deletePost(props: DeletePostProps) {
    return this.database.post.delete({ where: { postId: props.postId } })
      .then(() => true)
      .catch(() => false);
  }
}