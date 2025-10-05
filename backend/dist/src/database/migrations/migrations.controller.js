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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const migrations_service_1 = require("./migrations.service");
let MigrationsController = class MigrationsController {
    constructor(migrationsService) {
        this.migrationsService = migrationsService;
    }
    async runAllMigrations() {
        await this.migrationsService.runAllMigrations();
        return {
            success: true,
            message: 'Todas as migrations foram executadas com sucesso',
        };
    }
    async runSpecificMigration(body) {
        await this.migrationsService.runSpecificMigration(body.migrationName);
        return {
            success: true,
            message: `Migration ${body.migrationName} executada com sucesso`,
        };
    }
    async rollbackMigration(body) {
        await this.migrationsService.rollbackMigration(body.migrationName);
        return {
            success: true,
            message: `Migration ${body.migrationName} revertida com sucesso`,
        };
    }
};
exports.MigrationsController = MigrationsController;
__decorate([
    (0, common_1.Post)('run'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Executar todas as migrations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Migrations executadas com sucesso' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MigrationsController.prototype, "runAllMigrations", null);
__decorate([
    (0, common_1.Post)('run-specific'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Executar migration específica' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Migration executada com sucesso' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MigrationsController.prototype, "runSpecificMigration", null);
__decorate([
    (0, common_1.Post)('rollback'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reverter migration específica' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Migration revertida com sucesso' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MigrationsController.prototype, "rollbackMigration", null);
exports.MigrationsController = MigrationsController = __decorate([
    (0, swagger_1.ApiTags)('Migrations'),
    (0, common_1.Controller)('migrations'),
    __metadata("design:paramtypes", [migrations_service_1.MigrationsService])
], MigrationsController);
//# sourceMappingURL=migrations.controller.js.map