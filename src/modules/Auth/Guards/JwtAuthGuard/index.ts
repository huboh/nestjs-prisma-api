import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PublicKey } from '../../Decorators';
import { Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(PublicKey, [
      context.getHandler(),
      context.getClass(),
    ]);

    return isPublic || super.canActivate(context);
  }
}