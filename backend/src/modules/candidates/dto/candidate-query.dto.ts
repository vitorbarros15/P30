import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, Max, IsArray } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CandidateQueryDto {
  @ApiProperty({
    description: 'Página atual',
    example: 1,
    minimum: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Página deve ser um número' })
  @Min(1, { message: 'Página deve ser maior que 0' })
  page?: number = 1;

  @ApiProperty({
    description: 'Número de itens por página',
    example: 10,
    minimum: 1,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Limite deve ser um número' })
  @Min(1, { message: 'Limite deve ser maior que 0' })
  @Max(100, { message: 'Limite não pode ser maior que 100' })
  limit?: number = 10;

  @ApiProperty({
    description: 'Buscar por nome',
    example: 'João',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Buscar por email',
    example: 'joao@email.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    description: 'Filtrar por habilidades',
    example: ['JavaScript', 'React'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map(skill => skill.trim());
    }
    return value;
  })
  skills?: string[];

  @ApiProperty({
    description: 'Filtrar por anos de experiência mínimos',
    example: 2,
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Anos de experiência deve ser um número' })
  @Min(0, { message: 'Anos de experiência não pode ser negativo' })
  minExperience?: number;

  @ApiProperty({
    description: 'Filtrar por anos de experiência máximos',
    example: 5,
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Anos de experiência deve ser um número' })
  @Min(0, { message: 'Anos de experiência não pode ser negativo' })
  maxExperience?: number;

  @ApiProperty({
    description: 'Filtrar apenas candidatos convidados',
    example: true,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  isInvited?: boolean;

  @ApiProperty({
    description: 'Campo para ordenação',
    example: 'createdAt',
    enum: ['name', 'email', 'experienceYears', 'createdAt'],
    required: false,
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiProperty({
    description: 'Direção da ordenação',
    example: 'desc',
    enum: ['asc', 'desc'],
    required: false,
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';
}
