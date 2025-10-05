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
exports.CreateJobDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateJobDto {
}
exports.CreateJobDto = CreateJobDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Título da vaga',
        example: 'Desenvolvedor Full Stack',
        minLength: 1,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(1, { message: 'Título é obrigatório' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Título deve ter no máximo 100 caracteres' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descrição da vaga',
        example: 'Desenvolvedor experiente em React, Node.js e MongoDB para trabalhar em projetos inovadores.',
        minLength: 10,
        maxLength: 2000,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(10, { message: 'Descrição deve ter pelo menos 10 caracteres' }),
    (0, class_validator_1.MaxLength)(2000, { message: 'Descrição deve ter no máximo 2000 caracteres' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Localização da vaga',
        example: 'São Paulo, SP',
        minLength: 1,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(1, { message: 'Localização é obrigatória' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Localização deve ter no máximo 100 caracteres' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Faixa salarial',
        example: 'R$ 8.000 - R$ 12.000',
        minLength: 1,
        maxLength: 50,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(1, { message: 'Faixa salarial é obrigatória' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Faixa salarial deve ter no máximo 50 caracteres' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "salaryRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Skills necessárias para a vaga',
        example: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
        type: [String],
        minItems: 1,
        maxItems: 20,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Pelo menos uma skill é obrigatória' }),
    (0, class_validator_1.ArrayMaxSize)(20, { message: 'Máximo 20 skills permitidas' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Cada skill deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ each: true, message: 'Skill não pode ser vazia' }),
    __metadata("design:type", Array)
], CreateJobDto.prototype, "skills", void 0);
//# sourceMappingURL=create-job.dto.js.map