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
exports.CandidatesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_error_responses_decorator_1 = require("../../shared/decorators/api-error-responses.decorator");
const candidates_service_1 = require("./candidates.service");
const create_candidate_dto_1 = require("./dto/create-candidate.dto");
const update_candidate_dto_1 = require("./dto/update-candidate.dto");
const candidate_query_dto_1 = require("./dto/candidate-query.dto");
let CandidatesController = class CandidatesController {
    constructor(candidatesService) {
        this.candidatesService = candidatesService;
    }
    async create(createCandidateDto) {
        const candidate = await this.candidatesService.create(createCandidateDto);
        return {
            success: true,
            message: 'Candidato criado com sucesso',
            data: candidate,
        };
    }
    async findAll(query) {
        const result = await this.candidatesService.findAll(query);
        return {
            success: true,
            data: result,
        };
    }
    async findOne(id) {
        const candidate = await this.candidatesService.findOne(id);
        return {
            success: true,
            data: candidate,
        };
    }
    async update(id, updateCandidateDto) {
        const candidate = await this.candidatesService.update(id, updateCandidateDto);
        return {
            success: true,
            message: 'Candidato atualizado com sucesso',
            data: candidate,
        };
    }
    async remove(id) {
        const result = await this.candidatesService.remove(id);
        return {
            success: true,
            message: result.message,
            data: { id: result.id },
        };
    }
    async invite(id) {
        const candidate = await this.candidatesService.inviteCandidate(id);
        return {
            success: true,
            message: 'Candidato convidado com sucesso',
            data: candidate,
        };
    }
    async uninvite(id) {
        const candidate = await this.candidatesService.uninviteCandidate(id);
        return {
            success: true,
            message: 'Convite cancelado com sucesso',
            data: candidate,
        };
    }
};
exports.CandidatesController = CandidatesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Criar novo candidato' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Candidato criado com sucesso' }),
    (0, api_error_responses_decorator_1.ApiErrorResponses)(400, 401, 409, 500),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_candidate_dto_1.CreateCandidateDto]),
    __metadata("design:returntype", Promise)
], CandidatesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar candidatos com filtros e paginação' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de candidatos retornada com sucesso' }),
    (0, api_error_responses_decorator_1.ApiErrorResponses)(400, 401, 500),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [candidate_query_dto_1.CandidateQueryDto]),
    __metadata("design:returntype", Promise)
], CandidatesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar candidato por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Candidato encontrado' }),
    (0, api_error_responses_decorator_1.ApiErrorResponses)(400, 401, 404, 500),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidatesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar candidato' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Candidato atualizado com sucesso' }),
    (0, api_error_responses_decorator_1.ApiErrorResponses)(400, 401, 404, 409, 500),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_candidate_dto_1.UpdateCandidateDto]),
    __metadata("design:returntype", Promise)
], CandidatesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar candidato' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Candidato deletado com sucesso' }),
    (0, api_error_responses_decorator_1.ApiErrorResponses)(400, 401, 404, 500),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidatesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/invite'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Convidar candidato para vaga' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Candidato convidado com sucesso' }),
    (0, api_error_responses_decorator_1.ApiErrorResponses)(400, 401, 404, 500),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidatesController.prototype, "invite", null);
__decorate([
    (0, common_1.Post)(':id/uninvite'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Cancelar convite do candidato' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Convite cancelado com sucesso' }),
    (0, api_error_responses_decorator_1.ApiErrorResponses)(400, 401, 404, 500),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidatesController.prototype, "uninvite", null);
exports.CandidatesController = CandidatesController = __decorate([
    (0, swagger_1.ApiTags)('Candidates'),
    (0, common_1.Controller)('candidates'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [candidates_service_1.CandidatesService])
], CandidatesController);
//# sourceMappingURL=candidates.controller.js.map