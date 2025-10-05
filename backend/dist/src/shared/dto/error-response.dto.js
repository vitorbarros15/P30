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
exports.ValidationErrorResponseDto = exports.ErrorResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ErrorResponseDto {
}
exports.ErrorResponseDto = ErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica se a operação foi bem-sucedida',
        example: false,
    }),
    __metadata("design:type", Boolean)
], ErrorResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mensagem de erro',
        example: 'Erro de validação',
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Código do erro',
        example: 'VALIDATION_ERROR',
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detalhes adicionais do erro',
        example: { field: 'email', reason: 'Email inválido' },
        required: false,
    }),
    __metadata("design:type", Object)
], ErrorResponseDto.prototype, "details", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp do erro',
        example: '2024-01-15T10:30:00.000Z',
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Código de status HTTP',
        example: 400,
    }),
    __metadata("design:type", Number)
], ErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Caminho da requisição',
        example: '/api/v1/jobs',
    }),
    __metadata("design:type", String)
], ErrorResponseDto.prototype, "path", void 0);
class ValidationErrorResponseDto extends ErrorResponseDto {
}
exports.ValidationErrorResponseDto = ValidationErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de erros de validação',
        example: [
            {
                field: 'email',
                message: 'Email deve ser válido',
                value: 'invalid-email',
            },
        ],
    }),
    __metadata("design:type", Array)
], ValidationErrorResponseDto.prototype, "validationErrors", void 0);
//# sourceMappingURL=error-response.dto.js.map