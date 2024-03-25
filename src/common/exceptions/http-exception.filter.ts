import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { Response, Request } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(
    exception: HttpException | QueryFailedError | Error,
    host: ArgumentsHost,
  ) {
    this.logger.debug(exception.name);
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();

    this.handleMessage(exception);
    HttpExceptionFilter.handleResponse(response, request, exception);
  }

  private static handleResponse(
    response: Response,
    request: Request,
    exception: HttpException | QueryFailedError | Error
  ): void {
    let responseBody: any = {
      message: 'Internal server error',
      path: request.url,
      timestamp: new Date().toISOString(),
    };
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const mapResponseBody = (params: { statusCode: HttpStatus, message: string | object }): void => {
      responseBody = { ...responseBody, ...params };
    };

    if (exception instanceof HttpException) {
      mapResponseBody({
        statusCode: exception.getStatus(),
        message: exception.getResponse(),
      });
    } else if (exception instanceof QueryFailedError) {
      mapResponseBody({
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
      });
    } else if (exception instanceof Error) {
      mapResponseBody({
        statusCode: statusCode,
        message: exception.stack,
      });
    }

    response.status(statusCode).json(responseBody);
  }

  private handleMessage(
    exception: HttpException | QueryFailedError | Error
  ): void {
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse());
    } else if (exception instanceof QueryFailedError) {
      message = exception.stack.toString();
    } else if (exception instanceof Error) {
      message = exception.stack.toString();
    }

    this.logger.error(message);
  }
}
