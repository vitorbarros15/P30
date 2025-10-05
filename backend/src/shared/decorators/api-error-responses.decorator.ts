import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '../dto/error-response.dto';

export function ApiErrorResponses(...statusCodes: number[]) {
  const decorators = [];

  statusCodes.forEach((status) => {
    switch (status) {
      case 400:
        decorators.push(
          ApiResponse({
            status: 400,
            description: 'Dados inválidos',
            type: ErrorResponseDto,
          }),
        );
        break;
      case 401:
        decorators.push(
          ApiResponse({
            status: 401,
            description: 'Não autorizado',
            type: ErrorResponseDto,
          }),
        );
        break;
      case 403:
        decorators.push(
          ApiResponse({
            status: 403,
            description: 'Acesso negado',
            type: ErrorResponseDto,
          }),
        );
        break;
      case 404:
        decorators.push(
          ApiResponse({
            status: 404,
            description: 'Recurso não encontrado',
            type: ErrorResponseDto,
          }),
        );
        break;
      case 409:
        decorators.push(
          ApiResponse({
            status: 409,
            description: 'Conflito de dados',
            type: ErrorResponseDto,
          }),
        );
        break;
      case 500:
        decorators.push(
          ApiResponse({
            status: 500,
            description: 'Erro interno do servidor',
            type: ErrorResponseDto,
          }),
        );
        break;
    }
  });

  return applyDecorators(...decorators);
}
