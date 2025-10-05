import { Model } from 'mongoose';
import { Migration } from './migration.interface';
import { MigrationRecordDocument } from './schemas/migration-record.schema';
export declare class MigrationRunnerService {
    private migrationRecordModel;
    private readonly logger;
    constructor(migrationRecordModel: Model<MigrationRecordDocument>);
    runMigrations(migrations: Migration[]): Promise<void>;
    private isMigrationExecuted;
    private markMigrationAsExecuted;
    rollbackMigration(migrationName: string): Promise<void>;
    private getMigrationByName;
}
