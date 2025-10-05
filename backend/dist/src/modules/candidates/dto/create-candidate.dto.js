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
exports.CreateCandidateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCandidateDto {
}
exports.CreateCandidateDto = CreateCandidateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome completo do candidato',
        example: 'João Silva',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCandidateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email do candidato',
        example: 'joao.silva@email.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email deve ser válido' }),
    __metadata("design:type", String)
], CreateCandidateDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de habilidades do candidato',
        example: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Candidato deve ter pelo menos uma habilidade' }),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateCandidateDto.prototype, "skills", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Anos de experiência profissional',
        example: 3,
        minimum: 0,
        maximum: 50,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Anos de experiência deve ser um número' }),
    (0, class_validator_1.Min)(0, { message: 'Anos de experiência não pode ser negativo' }),
    (0, class_validator_1.Max)(50, { message: 'Anos de experiência não pode ser maior que 50' }),
    __metadata("design:type", Number)
], CreateCandidateDto.prototype, "experienceYears", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Se o candidato foi convidado para alguma vaga',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCandidateDto.prototype, "isInvited", void 0);
//# sourceMappingURL=create-candidate.dto.js.map