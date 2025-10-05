import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Migration } from './migration.interface';
import { MigrationRecord, MigrationRecordDocument } from './schemas/migration-record.schema';

@Injectable()
export class MigrationRunnerService {
  private readonly logger = new Logger(MigrationRunnerService.name);

  constructor(
    @InjectModel(MigrationRecord.name) private migrationRecordModel: Model<MigrationRecordDocument>,
  ) {}

  async runMigrations(migrations: Migration[]): Promise<void> {
    this.logger.log('🚀 Starting migrations...');

    for (const migration of migrations) {
      const isExecuted = await this.isMigrationExecuted(migration.name);
      
      if (!isExecuted) {
        try {
          this.logger.log(`Running migration: ${migration.name}`);
          await migration.up();
          await this.markMigrationAsExecuted(migration);
          this.logger.log(`Migration completed: ${migration.name}`);
        } catch (error) {
          this.logger.error(`Migration failed: ${migration.name}`, error);
          throw error;
        }
      } else {
        this.logger.log(`Migration already executed: ${migration.name}`);
      }
    }

    this.logger.log('🎉 All migrations completed successfully!');
  }

  private async isMigrationExecuted(migrationName: string): Promise<boolean> {
    const record = await this.migrationRecordModel.findOne({ name: migrationName });
    return !!record;
  }

  private async markMigrationAsExecuted(migration: Migration): Promise<void> {
    await this.migrationRecordModel.create({
      name: migration.name,
      version: migration.version,
      description: migration.description,
      executedAt: new Date(),
    });
  }

  async rollbackMigration(migrationName: string): Promise<void> {
    this.logger.log(`🔄 Rolling back migration: ${migrationName}`);
    
    const migration = await this.getMigrationByName(migrationName);
    if (migration) {
      await migration.down();
      await this.migrationRecordModel.deleteOne({ name: migrationName });
      this.logger.log(`✅ Migration rolled back: ${migrationName}`);
    }
  }

  private async getMigrationByName(name: string): Promise<Migration | null> {
    return null;
  }
}
