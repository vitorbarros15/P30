import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): Response<any, Record<string, any>>;
}
export declare class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
