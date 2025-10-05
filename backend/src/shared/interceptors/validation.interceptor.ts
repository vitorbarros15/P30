import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ValidationException } from '../exceptions/business.exception';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        // Se for erro de validação do class-validator
        if (error.response && Array.isArray(error.response.message)) {
          const validationErrors = error.response.message.map((msg: string) => {
            const parts = msg.split(' ');
            const field = parts[0];
            const message = msg;
            return { field, message, value: null };
          });

          return throwError(
            () => new ValidationException(
              'Dados de entrada inválidos',
              { validationErrors }
            )
          );
        }

        // Se for erro de validação do Zod
        if (error.name === 'ZodError') {
          const validationErrors = error.issues.map((issue: any) => ({
            field: issue.path.join('.'),
            message: issue.message,
            value: issue.input,
          }));

          return throwError(
            () => new ValidationException(
              'Dados de entrada inválidos',
              { validationErrors }
            )
          );
        }

        return throwError(() => error);
      }),
    );
  }
}
