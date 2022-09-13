import { Response } from 'express';
import { sendJson } from '../../../helpers';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const httpStatus = exception.getStatus();
    const serverResponse = exception.getResponse?.() as any;

    sendJson(response, {
      statusCode: httpStatus,
      status: "error",
      error: {
        cause: process.env.NODE_ENV === "development" ? exception.cause : undefined,
        stack: process.env.NODE_ENV === "development" ? exception.stack : undefined,
        name: serverResponse?.error || exception.name,
        message: serverResponse?.message || exception.message,
      }
    });
  }
}