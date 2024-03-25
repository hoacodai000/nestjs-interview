import { Catch, ArgumentsHost, HttpException, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch()
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | QueryFailedError | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: 'Database exception occurred',
    });
  }
}
