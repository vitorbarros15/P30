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
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobQueryDto } from './dto/job-query.dto';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Jobs')
@Controller('jobs')
// @UseGuards(JwtAuthGuard) // Uncomment when auth is implemented
// @ApiBearerAuth() // Uncomment when auth is implemented
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar nova vaga' })
  @ApiResponse({ status: 201, description: 'Vaga criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createJobDto: CreateJobDto) {
    const job = await this.jobsService.create(createJobDto);
    return {
      success: true,
      message: 'Vaga criada com sucesso',
      data: job,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar vagas com paginação' })
  @ApiResponse({ status: 200, description: 'Lista de vagas retornada com sucesso' })
  async findAll(@Query() query: JobQueryDto) {
    const result = await this.jobsService.findAll(query);
    return {
      success: true,
      data: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar vaga por ID' })
  @ApiResponse({ status: 200, description: 'Vaga encontrada' })
  @ApiResponse({ status: 404, description: 'Vaga não encontrada' })
  @ApiResponse({ status: 400, description: 'ID inválido' })
  async findOne(@Param('id') id: string) {
    const job = await this.jobsService.findOne(id);
    return {
      success: true,
      data: job,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar vaga' })
  @ApiResponse({ status: 200, description: 'Vaga atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Vaga não encontrada' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    const job = await this.jobsService.update(id, updateJobDto);
    return {
      success: true,
      message: 'Vaga atualizada com sucesso',
      data: job,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deletar vaga' })
  @ApiResponse({ status: 200, description: 'Vaga deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Vaga não encontrada' })
  @ApiResponse({ status: 400, description: 'ID inválido' })
  async remove(@Param('id') id: string) {
    const result = await this.jobsService.remove(id);
    return {
      success: true,
      message: result.message,
      data: { id: result.id },
    };
  }
}
