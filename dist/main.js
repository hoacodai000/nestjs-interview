"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./common/exceptions/http-exception.filter");
const auth_guard_1 = require("./common/guards/auth.guard");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalGuards(new auth_guard_1.AuthGuard());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map