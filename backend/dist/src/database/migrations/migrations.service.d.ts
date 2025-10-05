import { MigrationRunnerService } from './migration-runner.service';
import { CreateDefaultUserMigration } from './001-create-default-user.migration';
import { SeedCandidatesMigration } from './002-seed-candidates.migration';
export declare class MigrationsService {
    private readonly migrationRunner;
    private readonly createDefaultUserMigration;
    private readonly seedCandidatesMigration;
    private readonly logger;
    constructor(migrationRunner: MigrationRunnerService, createDefaultUserMigration: CreateDefaultUserMigration, seedCandidatesMigration: SeedCandidatesMigration);
    runAllMigrations(): Promise<void>;
    runSpecificMigration(migrationName: string): Promise<void>;
    rollbackMigration(migrationName: string): Promise<void>;
}
