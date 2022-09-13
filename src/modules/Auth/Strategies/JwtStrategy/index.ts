import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthToken } from '../../types';
import { JwtSecret } from '../../../../constants';
import { DatabaseService } from 'src/modules/Database/service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private database: DatabaseService) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow(JwtSecret),
    });
  }

  validate(payload: AuthToken) {
    return this.database.user.findUnique({
      where: { userId: payload?.userId }
    });
  }
}