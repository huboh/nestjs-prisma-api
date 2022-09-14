import { Reflector } from '@nestjs/core';
import { DatabaseService } from 'src/modules/Database/service';
import { OnlyAuthorKey, OnlyAuthorMetaData } from '../../Decorators';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

/**
 *  This guard restrict access to controller class or method route handlers to only authors of requested post
 */
@Injectable()
export class OnlyAuthorGuard implements CanActivate {
  constructor(private reflector: Reflector, private database: DatabaseService) { }

  private getRouteMetaData(context: ExecutionContext): OnlyAuthorMetaData {
    return this.reflector.getAllAndOverride(OnlyAuthorKey, [context.getHandler(), context.getClass()]) || [];
  }

  async canActivate(ctx: ExecutionContext) {
    const http = ctx.switchToHttp();
    const request = http.getRequest();
    const [onlyAuthorRoute, postQueryGetter] = this.getRouteMetaData(ctx);

    if (onlyAuthorRoute) {
      const user = request.user;
      const post = await this.database.post.findUniqueOrThrow({ where: postQueryGetter?.(request) || {} });

      if (user.id !== post.authorId) {
        throw new UnauthorizedException({ message: "you dont have permission to modify or access this resource" });
      }
    }

    return true;
  }
}