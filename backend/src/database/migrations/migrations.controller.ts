import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MigrationsService } from './migrations.service';

@ApiTags('Migrations')
@Controller('migrations')
export class MigrationsController {
  constructor(private readonly migrationsService: MigrationsService) {}

  @Post('run')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Executar todas as migrations' })
  @ApiResponse({ status: 200, description: 'Migrations executadas com sucesso' })
  async runAllMigrations() {
    await this.migrationsService.runAllMigrations();
    return {
      success: true,
      message: 'Todas as migrations foram executadas com sucesso',
    };
  }

  @Post('run-specific')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Executar migration específica' })
  @ApiResponse({ status: 200, description: 'Migration executada com sucesso' })
  async runSpecificMigration(@Body() body: { migrationName: string }) {
    await this.migrationsService.runSpecificMigration(body.migrationName);
    return {
      success: true,
      message: `Migration ${body.migrationName} executada com sucesso`,
    };
  }

  @Post('rollback')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reverter migration específica' })
  @ApiResponse({ status: 200, description: 'Migration revertida com sucesso' })
  async rollbackMigration(@Body() body: { migrationName: string }) {
    await this.migrationsService.rollbackMigration(body.migrationName);
    return {
      success: true,
      message: `Migration ${body.migrationName} revertida com sucesso`,
    };
  }
}
