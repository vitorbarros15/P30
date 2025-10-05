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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MigrationRunnerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationRunnerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const migration_record_schema_1 = require("./schemas/migration-record.schema");
let MigrationRunnerService = MigrationRunnerService_1 = class MigrationRunnerService {
    constructor(migrationRecordModel) {
        this.migrationRecordModel = migrationRecordModel;
        this.logger = new common_1.Logger(MigrationRunnerService_1.name);
    }
    async runMigrations(migrations) {
        this.logger.log('🚀 Starting migrations...');
        for (const migration of migrations) {
            const isExecuted = await this.isMigrationExecuted(migration.name);
            if (!isExecuted) {
                try {
                    this.logger.log(`Running migration: ${migration.name}`);
                    await migration.up();
                    await this.markMigrationAsExecuted(migration);
                    this.logger.log(`Migration completed: ${migration.name}`);
                }
                catch (error) {
                    this.logger.error(`Migration failed: ${migration.name}`, error);
                    throw error;
                }
            }
            else {
                this.logger.log(`Migration already executed: ${migration.name}`);
            }
        }
        this.logger.log('🎉 All migrations completed successfully!');
    }
    async isMigrationExecuted(migrationName) {
        const record = await this.migrationRecordModel.findOne({ name: migrationName });
        return !!record;
    }
    async markMigrationAsExecuted(migration) {
        await this.migrationRecordModel.create({
            name: migration.name,
            version: migration.version,
            description: migration.description,
            executedAt: new Date(),
        });
    }
    async rollbackMigration(migrationName) {
        this.logger.log(`🔄 Rolling back migration: ${migrationName}`);
        const migration = await this.getMigrationByName(migrationName);
        if (migration) {
            await migration.down();
            await this.migrationRecordModel.deleteOne({ name: migrationName });
            this.logger.log(`✅ Migration rolled back: ${migrationName}`);
        }
    }
    async getMigrationByName(name) {
        return null;
    }
};
exports.MigrationRunnerService = MigrationRunnerService;
exports.MigrationRunnerService = MigrationRunnerService = MigrationRunnerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(migration_record_schema_1.MigrationRecord.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MigrationRunnerService);
//# sourceMappingURL=migration-runner.service.js.map