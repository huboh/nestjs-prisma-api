import { Prisma } from "@prisma/client";
import { Response } from 'express';
import { sendJson } from '../../../helpers';
import { ExceptionFilter, Catch, ArgumentsHost, ForbiddenException, HttpStatus } from '@nestjs/common';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.NotFoundError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    let error = null;
    let statusCode = null;

    switch (exception.code) {
      case "P2002": {
        statusCode = HttpStatus.FORBIDDEN;
        error = new ForbiddenException({ message: `${exception.meta.target[0]} already exists` });
        break;
      }

      default: {
        statusCode = 500;
        error = exception;
        break;
      }
    }

    // TODO: report prisma error

    sendJson(response, {
      statusCode: statusCode,
      status: "error",
      error: error,
    });
  }
}