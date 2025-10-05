import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, IsNumber, IsOptional, Min, Max, ArrayMinSize } from 'class-validator';

export class CreateCandidateDto {
  @ApiProperty({
    description: 'Nome completo do candidato',
    example: 'João Silva',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email do candidato',
    example: 'joao.silva@email.com',
  })
  @IsEmail({}, { message: 'Email deve ser válido' })
  email: string;

  @ApiProperty({
    description: 'Lista de habilidades do candidato',
    example: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'Candidato deve ter pelo menos uma habilidade' })
  @IsString({ each: true })
  skills: string[];

  @ApiProperty({
    description: 'Anos de experiência profissional',
    example: 3,
    minimum: 0,
    maximum: 50,
  })
  @IsNumber({}, { message: 'Anos de experiência deve ser um número' })
  @Min(0, { message: 'Anos de experiência não pode ser negativo' })
  @Max(50, { message: 'Anos de experiência não pode ser maior que 50' })
  experienceYears: number;

  @ApiProperty({
    description: 'Se o candidato foi convidado para alguma vaga',
    example: false,
    required: false,
  })
  @IsOptional()
  isInvited?: boolean;
}
