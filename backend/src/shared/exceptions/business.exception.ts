import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    code?: string,
    details?: any,
  ) {
    super(
      {
        message,
        code: code || 'BUSINESS_ERROR',
        details,
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }
}

export class ValidationException extends BusinessException {
  constructor(message: string, details?: any) {
    super(message, HttpStatus.BAD_REQUEST, 'VALIDATION_ERROR', details);
  }
}

export class NotFoundException extends BusinessException {
  constructor(resource: string, id?: string) {
    const message = id 
      ? `${resource} com ID ${id} não encontrado`
      : `${resource} não encontrado`;
    super(message, HttpStatus.NOT_FOUND, 'NOT_FOUND', { resource, id });
  }
}

export class ConflictException extends BusinessException {
  constructor(message: string, details?: any) {
    super(message, HttpStatus.CONFLICT, 'CONFLICT_ERROR', details);
  }
}

export class UnauthorizedException extends BusinessException {
  constructor(message: string = 'Não autorizado') {
    super(message, HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED');
  }
}

export class ForbiddenException extends BusinessException {
  constructor(message: string = 'Acesso negado') {
    super(message, HttpStatus.FORBIDDEN, 'FORBIDDEN');
  }
}
