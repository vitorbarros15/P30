import { IsString, IsArray, MinLength, MaxLength, ArrayMinSize, ArrayMaxSize, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({
    description: 'Título da vaga',
    example: 'Desenvolvedor Full Stack',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'Título é obrigatório' })
  @MaxLength(100, { message: 'Título deve ter no máximo 100 caracteres' })
  title: string;

  @ApiProperty({
    description: 'Descrição da vaga',
    example: 'Desenvolvedor experiente em React, Node.js e MongoDB para trabalhar em projetos inovadores.',
    minLength: 10,
    maxLength: 2000,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Descrição deve ter pelo menos 10 caracteres' })
  @MaxLength(2000, { message: 'Descrição deve ter no máximo 2000 caracteres' })
  description: string;

  @ApiProperty({
    description: 'Localização da vaga',
    example: 'São Paulo, SP',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'Localização é obrigatória' })
  @MaxLength(100, { message: 'Localização deve ter no máximo 100 caracteres' })
  location: string;

  @ApiProperty({
    description: 'Faixa salarial',
    example: 'R$ 8.000 - R$ 12.000',
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'Faixa salarial é obrigatória' })
  @MaxLength(50, { message: 'Faixa salarial deve ter no máximo 50 caracteres' })
  salaryRange: string;

  @ApiProperty({
    description: 'Skills necessárias para a vaga',
    example: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    type: [String],
    minItems: 1,
    maxItems: 20,
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'Pelo menos uma skill é obrigatória' })
  @ArrayMaxSize(20, { message: 'Máximo 20 skills permitidas' })
  @IsString({ each: true, message: 'Cada skill deve ser uma string' })
  @IsNotEmpty({ each: true, message: 'Skill não pode ser vazia' })
  skills: string[];
}
