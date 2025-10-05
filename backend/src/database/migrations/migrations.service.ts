import { Injectable, Logger } from '@nestjs/common';
import { MigrationRunnerService } from './migration-runner.service';
import { CreateDefaultUserMigration } from './001-create-default-user.migration';
import { SeedCandidatesMigration } from './002-seed-candidates.migration';
import { Migration } from './migration.interface';

@Injectable()
export class MigrationsService {
  private readonly logger = new Logger(MigrationsService.name);

  constructor(
    private readonly migrationRunner: MigrationRunnerService,
    private readonly createDefaultUserMigration: CreateDefaultUserMigration,
    private readonly seedCandidatesMigration: SeedCandidatesMigration,
  ) {}

  async runAllMigrations(): Promise<void> {
    this.logger.log('Starting database migrations...');

    const migrations: Migration[] = [
      this.createDefaultUserMigration,
      this.seedCandidatesMigration,
    ];

    await this.migrationRunner.runMigrations(migrations);
  }

  async runSpecificMigration(migrationName: string): Promise<void> {
    this.logger.log(`Running specific migration: ${migrationName}`);

    let migration: Migration | null = null;

    switch (migrationName) {
      case '001-create-default-user':
        migration = this.createDefaultUserMigration;
        break;
      case '002-seed-candidates':
        migration = this.seedCandidatesMigration;
        break;
      default:
        throw new Error(`Migration not found: ${migrationName}`);
    }

    if (migration) {
      await this.migrationRunner.runMigrations([migration]);
    }
  }

  async rollbackMigration(migrationName: string): Promise<void> {
    this.logger.log(`Rolling back migration: ${migrationName}`);
    await this.migrationRunner.rollbackMigration(migrationName);
  }
}
