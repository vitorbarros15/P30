"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MigrationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationsService = void 0;
const common_1 = require("@nestjs/common");
const migration_runner_service_1 = require("./migration-runner.service");
const _001_create_default_user_migration_1 = require("./001-create-default-user.migration");
const _002_seed_candidates_migration_1 = require("./002-seed-candidates.migration");
let MigrationsService = MigrationsService_1 = class MigrationsService {
    constructor(migrationRunner, createDefaultUserMigration, seedCandidatesMigration) {
        this.migrationRunner = migrationRunner;
        this.createDefaultUserMigration = createDefaultUserMigration;
        this.seedCandidatesMigration = seedCandidatesMigration;
        this.logger = new common_1.Logger(MigrationsService_1.name);
    }
    async runAllMigrations() {
        this.logger.log('Starting database migrations...');
        const migrations = [
            this.createDefaultUserMigration,
            this.seedCandidatesMigration,
        ];
        await this.migrationRunner.runMigrations(migrations);
    }
    async runSpecificMigration(migrationName) {
        this.logger.log(`Running specific migration: ${migrationName}`);
        let migration = null;
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
    async rollbackMigration(migrationName) {
        this.logger.log(`Rolling back migration: ${migrationName}`);
        await this.migrationRunner.rollbackMigration(migrationName);
    }
};
exports.MigrationsService = MigrationsService;
exports.MigrationsService = MigrationsService = MigrationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [migration_runner_service_1.MigrationRunnerService,
        _001_create_default_user_migration_1.CreateDefaultUserMigration,
        _002_seed_candidates_migration_1.SeedCandidatesMigration])
], MigrationsService);
//# sourceMappingURL=migrations.service.js.map