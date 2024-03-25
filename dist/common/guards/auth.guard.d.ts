import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class AuthGuard implements CanActivate {
    private readonly logger;
    constructor();
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
