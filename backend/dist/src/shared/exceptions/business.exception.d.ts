import { HttpException, HttpStatus } from '@nestjs/common';
export declare class BusinessException extends HttpException {
    constructor(message: string, status?: HttpStatus, code?: string, details?: any);
}
export declare class ValidationException extends BusinessException {
    constructor(message: string, details?: any);
}
export declare class NotFoundException extends BusinessException {
    constructor(resource: string, id?: string);
}
export declare class ConflictException extends BusinessException {
    constructor(message: string, details?: any);
}
export declare class UnauthorizedException extends BusinessException {
    constructor(message?: string);
}
export declare class ForbiddenException extends BusinessException {
    constructor(message?: string);
}
