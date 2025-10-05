import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BusinessException } from '../exceptions/business.exception';
import { ErrorResponseDto } from '../dto/error-response.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Se for uma BusinessException, usar a resposta estruturada
    if (exception instanceof BusinessException) {
      const errorResponse: ErrorResponseDto = {
        success: false,
        message: exception.message,
        code: (exception.getResponse() as any).code || 'UNKNOWN_ERROR',
        details: (exception.getResponse() as any).details,
        timestamp: (exception.getResponse() as any).timestamp || new Date().toISOString(),
        statusCode: status,
        path: request.url,
      };

      return response.status(status).json(errorResponse);
    }

    // Para outras HttpExceptions, usar formato padrão
    const errorResponse: ErrorResponseDto = {
      success: false,
      message: exception.message,
      code: 'HTTP_ERROR',
      timestamp: new Date().toISOString(),
      statusCode: status,
      path: request.url,
      ...(process.env.NODE_ENV === 'development' && {
        stack: exception.stack,
      }),
    };

    response.status(status).json(errorResponse);
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException 
      ? exception.getStatus() 
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException 
      ? exception.message 
      : 'Erro interno do servidor';

    const errorResponse = {
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      ...(process.env.NODE_ENV === 'development' && {
        stack: exception instanceof Error ? exception.stack : undefined,
      }),
    };

    response.status(status).json(errorResponse);
  }
}
