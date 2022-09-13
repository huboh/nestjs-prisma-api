import { Prisma } from "@prisma/client";
import { Response } from 'express';
import { sendJson } from '../../../helpers';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch(Prisma.NotFoundError)
export class PrismaNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.NotFoundError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    // TODO: report prisma error

    sendJson(response, {
      statusCode: 404,
      status: "error",
      error: exception,
    });
  }
}