import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Admin P30',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
  @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'admin@p30.com',
  })
  @IsEmail({}, { message: 'Email deve ter um formato válido' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  password: string;
}
