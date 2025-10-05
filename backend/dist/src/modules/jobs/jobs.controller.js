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
exports.JobsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_error_responses_decorator_1 = require("../../shared/decorators/api-error-responses.decorator");
const jobs_service_1 = require("./jobs.service");
const create_job_dto_1 = require("./dto/create-job.dto");
const update_job_dto_1 = require("./dto/update-job.dto");
const job_query_dto_1 = require("./dto/job-query.dto");
let JobsController = class JobsController {
    constructor(jobsService) {
        this.jobsService = jobsService;
    }
    async create(createJobDto) {
        const job = await this.jobsService.create(createJobDto);
        return {
            success: true,
            message: 'Vaga criada com sucesso',
            data: job,
        };
    }
    async findAll(query) {
        const result = await this.jobsService.findAll(query);
        return {
            success: true,
            data: result,
        };
    }
    async findOne(id) {
        const job = await this.jobsService.findOne(id);
        return {
            success: true,
            data: job,
        };
    }
    async update(id, updateJobDto) {
        const job = await this.jobsService.update(id, updateJobDto);
        return {
            success: true,
            message: 'Vaga atualizada com sucesso',
            data: job,
        };
    }
    async remove(id) {
        const result = await this.jobsService.remove(id);
        return {
            success: true,
            message: result.message,
            data: { id: result.id },
        };
    }
};
exports.JobsController = JobsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Criar nova vaga' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Vaga criada com sucesso' }),
    (0, api_error_responses_decorator_1.ApiErrorResponses)(400, 401, 500),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_dto_1.CreateJobDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar vagas com paginação' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de vagas retornada com sucesso' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_query_dto_1.JobQueryDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar vaga por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vaga encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vaga não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'ID inválido' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar vaga' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vaga atualizada com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vaga não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_job_dto_1.UpdateJobDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar vaga' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vaga deletada com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vaga não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'ID inválido' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "remove", null);
exports.JobsController = JobsController = __decorate([
    (0, swagger_1.ApiTags)('Jobs'),
    (0, common_1.Controller)('jobs'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [jobs_service_1.JobsService])
], JobsController);
//# sourceMappingURL=jobs.controller.js.map