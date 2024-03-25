import { ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';
export declare class HttpExceptionFilter extends BaseExceptionFilter {
    private readonly logger;
    catch(exception: HttpException | QueryFailedError | Error, host: ArgumentsHost): void;
    private static handleResponse;
    private handleMessage;
}
