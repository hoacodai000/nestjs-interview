import { ArgumentsHost, HttpException, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
export declare class DatabaseExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException | QueryFailedError | Error, host: ArgumentsHost): void;
}
