"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("typeorm");
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter extends core_1.BaseExceptionFilter {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(HttpExceptionFilter_1.name);
    }
    catch(exception, host) {
        this.logger.debug(exception.name);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        this.handleMessage(exception);
        HttpExceptionFilter_1.handleResponse(response, request, exception);
    }
    static handleResponse(response, request, exception) {
        let responseBody = {
            message: 'Internal server error',
            path: request.url,
            timestamp: new Date().toISOString(),
        };
        const statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const mapResponseBody = (params) => {
            responseBody = { ...responseBody, ...params };
        };
        if (exception instanceof common_1.HttpException) {
            mapResponseBody({
                statusCode: exception.getStatus(),
                message: exception.getResponse(),
            });
        }
        else if (exception instanceof typeorm_1.QueryFailedError) {
            mapResponseBody({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: exception.message,
            });
        }
        else if (exception instanceof Error) {
            mapResponseBody({
                statusCode: statusCode,
                message: exception.stack,
            });
        }
        response.status(statusCode).json(responseBody);
    }
    handleMessage(exception) {
        let message = 'Internal Server Error';
        if (exception instanceof common_1.HttpException) {
            message = JSON.stringify(exception.getResponse());
        }
        else if (exception instanceof typeorm_1.QueryFailedError) {
            message = exception.stack.toString();
        }
        else if (exception instanceof Error) {
            message = exception.stack.toString();
        }
        this.logger.error(message);
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map