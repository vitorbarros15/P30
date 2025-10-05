import { MigrationsService } from './migrations.service';
export declare class MigrationsController {
    private readonly migrationsService;
    constructor(migrationsService: MigrationsService);
    runAllMigrations(): Promise<{
        success: boolean;
        message: string;
    }>;
    runSpecificMigration(body: {
        migrationName: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    rollbackMigration(body: {
        migrationName: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
