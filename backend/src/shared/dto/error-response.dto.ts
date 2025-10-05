import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Indica se a operação foi bem-sucedida',
    example: false,
  })
  success: boolean;

  @ApiProperty({
    description: 'Mensagem de erro',
    example: 'Erro de validação',
  })
  message: string;

  @ApiProperty({
    description: 'Código do erro',
    example: 'VALIDATION_ERROR',
  })
  code: string;

  @ApiProperty({
    description: 'Detalhes adicionais do erro',
    example: { field: 'email', reason: 'Email inválido' },
    required: false,
  })
  details?: any;

  @ApiProperty({
    description: 'Timestamp do erro',
    example: '2024-01-15T10:30:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Código de status HTTP',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Caminho da requisição',
    example: '/api/v1/jobs',
  })
  path: string;
}

export class ValidationErrorResponseDto extends ErrorResponseDto {
  @ApiProperty({
    description: 'Lista de erros de validação',
    example: [
      {
        field: 'email',
        message: 'Email deve ser válido',
        value: 'invalid-email',
      },
    ],
  })
  validationErrors?: Array<{
    field: string;
    message: string;
    value: any;
  }>;
}
