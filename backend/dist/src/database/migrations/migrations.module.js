"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const migration_runner_service_1 = require("./migration-runner.service");
const migrations_service_1 = require("./migrations.service");
const migrations_controller_1 = require("./migrations.controller");
const migration_record_schema_1 = require("./schemas/migration-record.schema");
const _001_create_default_user_migration_1 = require("./001-create-default-user.migration");
const _002_seed_candidates_migration_1 = require("./002-seed-candidates.migration");
const user_schema_1 = require("../../modules/auth/schemas/user.schema");
const candidates_module_1 = require("../../modules/candidates/candidates.module");
let MigrationsModule = class MigrationsModule {
};
exports.MigrationsModule = MigrationsModule;
exports.MigrationsModule = MigrationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: migration_record_schema_1.MigrationRecord.name, schema: migration_record_schema_1.MigrationRecordSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
            candidates_module_1.CandidatesModule,
        ],
        controllers: [migrations_controller_1.MigrationsController],
        providers: [
            migration_runner_service_1.MigrationRunnerService,
            migrations_service_1.MigrationsService,
            _001_create_default_user_migration_1.CreateDefaultUserMigration,
            _002_seed_candidates_migration_1.SeedCandidatesMigration,
        ],
        exports: [migration_runner_service_1.MigrationRunnerService, migrations_service_1.MigrationsService],
    })
], MigrationsModule);
//# sourceMappingURL=migrations.module.js.map