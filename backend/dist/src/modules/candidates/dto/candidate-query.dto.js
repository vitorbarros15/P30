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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CandidateQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.sortBy = 'createdAt';
        this.sortOrder = 'desc';
    }
}
exports.CandidateQueryDto = CandidateQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Página atual',
        example: 1,
        minimum: 1,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Página deve ser um número' }),
    (0, class_validator_1.Min)(1, { message: 'Página deve ser maior que 0' }),
    __metadata("design:type", Number)
], CandidateQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de itens por página',
        example: 10,
        minimum: 1,
        maximum: 100,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Limite deve ser um número' }),
    (0, class_validator_1.Min)(1, { message: 'Limite deve ser maior que 0' }),
    (0, class_validator_1.Max)(100, { message: 'Limite não pode ser maior que 100' }),
    __metadata("design:type", Number)
], CandidateQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Buscar por nome',
        example: 'João',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CandidateQueryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Buscar por email',
        example: 'joao@email.com',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CandidateQueryDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar por habilidades',
        example: ['JavaScript', 'React'],
        type: [String],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            return value.split(',').map(skill => skill.trim());
        }
        return value;
    }),
    __metadata("design:type", Array)
], CandidateQueryDto.prototype, "skills", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar por anos de experiência mínimos',
        example: 2,
        minimum: 0,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Anos de experiência deve ser um número' }),
    (0, class_validator_1.Min)(0, { message: 'Anos de experiência não pode ser negativo' }),
    __metadata("design:type", Number)
], CandidateQueryDto.prototype, "minExperience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar por anos de experiência máximos',
        example: 5,
        minimum: 0,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Anos de experiência deve ser um número' }),
    (0, class_validator_1.Min)(0, { message: 'Anos de experiência não pode ser negativo' }),
    __metadata("design:type", Number)
], CandidateQueryDto.prototype, "maxExperience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filtrar apenas candidatos convidados',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], CandidateQueryDto.prototype, "isInvited", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Campo para ordenação',
        example: 'createdAt',
        enum: ['name', 'email', 'experienceYears', 'createdAt'],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CandidateQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Direção da ordenação',
        example: 'desc',
        enum: ['asc', 'desc'],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CandidateQueryDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=candidate-query.dto.js.map