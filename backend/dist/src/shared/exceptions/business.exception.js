"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = exports.UnauthorizedException = exports.ConflictException = exports.NotFoundException = exports.ValidationException = exports.BusinessException = void 0;
const common_1 = require("@nestjs/common");
class BusinessException extends common_1.HttpException {
    constructor(message, status = common_1.HttpStatus.BAD_REQUEST, code, details) {
        super({
            message,
            code: code || 'BUSINESS_ERROR',
            details,
            timestamp: new Date().toISOString(),
        }, status);
    }
}
exports.BusinessException = BusinessException;
class ValidationException extends BusinessException {
    constructor(message, details) {
        super(message, common_1.HttpStatus.BAD_REQUEST, 'VALIDATION_ERROR', details);
    }
}
exports.ValidationException = ValidationException;
class NotFoundException extends BusinessException {
    constructor(resource, id) {
        const message = id
            ? `${resource} com ID ${id} não encontrado`
            : `${resource} não encontrado`;
        super(message, common_1.HttpStatus.NOT_FOUND, 'NOT_FOUND', { resource, id });
    }
}
exports.NotFoundException = NotFoundException;
class ConflictException extends BusinessException {
    constructor(message, details) {
        super(message, common_1.HttpStatus.CONFLICT, 'CONFLICT_ERROR', details);
    }
}
exports.ConflictException = ConflictException;
class UnauthorizedException extends BusinessException {
    constructor(message = 'Não autorizado') {
        super(message, common_1.HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED');
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends BusinessException {
    constructor(message = 'Acesso negado') {
        super(message, common_1.HttpStatus.FORBIDDEN, 'FORBIDDEN');
    }
}
exports.ForbiddenException = ForbiddenException;
//# sourceMappingURL=business.exception.js.map