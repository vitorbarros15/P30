import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ApiErrorResponses } from '../../shared/decorators/api-error-responses.decorator';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CandidateQueryDto } from './dto/candidate-query.dto';

@ApiTags('Candidates')
@Controller('candidates')
@ApiBearerAuth()
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo candidato' })
  @ApiResponse({ status: 201, description: 'Candidato criado com sucesso' })
  @ApiErrorResponses(400, 401, 409, 500)
  async create(@Body() createCandidateDto: CreateCandidateDto) {
    const candidate = await this.candidatesService.create(createCandidateDto);
    return {
      success: true,
      message: 'Candidato criado com sucesso',
      data: candidate,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar candidatos com filtros e paginação' })
  @ApiResponse({ status: 200, description: 'Lista de candidatos retornada com sucesso' })
  @ApiErrorResponses(400, 401, 500)
  async findAll(@Query() query: CandidateQueryDto) {
    const result = await this.candidatesService.findAll(query);
    return {
      success: true,
      data: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar candidato por ID' })
  @ApiResponse({ status: 200, description: 'Candidato encontrado' })
  @ApiErrorResponses(400, 401, 404, 500)
  async findOne(@Param('id') id: string) {
    const candidate = await this.candidatesService.findOne(id);
    return {
      success: true,
      data: candidate,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar candidato' })
  @ApiResponse({ status: 200, description: 'Candidato atualizado com sucesso' })
  @ApiErrorResponses(400, 401, 404, 409, 500)
  async update(@Param('id') id: string, @Body() updateCandidateDto: UpdateCandidateDto) {
    const candidate = await this.candidatesService.update(id, updateCandidateDto);
    return {
      success: true,
      message: 'Candidato atualizado com sucesso',
      data: candidate,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deletar candidato' })
  @ApiResponse({ status: 200, description: 'Candidato deletado com sucesso' })
  @ApiErrorResponses(400, 401, 404, 500)
  async remove(@Param('id') id: string) {
    const result = await this.candidatesService.remove(id);
    return {
      success: true,
      message: result.message,
      data: { id: result.id },
    };
  }

  @Post(':id/invite')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Convidar candidato para vaga' })
  @ApiResponse({ status: 200, description: 'Candidato convidado com sucesso' })
  @ApiErrorResponses(400, 401, 404, 500)
  async invite(@Param('id') id: string) {
    const candidate = await this.candidatesService.inviteCandidate(id);
    return {
      success: true,
      message: 'Candidato convidado com sucesso',
      data: candidate,
    };
  }

  @Post(':id/uninvite')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancelar convite do candidato' })
  @ApiResponse({ status: 200, description: 'Convite cancelado com sucesso' })
  @ApiErrorResponses(400, 401, 404, 500)
  async uninvite(@Param('id') id: string) {
    const candidate = await this.candidatesService.uninviteCandidate(id);
    return {
      success: true,
      message: 'Convite cancelado com sucesso',
      data: candidate,
    };
  }
}
