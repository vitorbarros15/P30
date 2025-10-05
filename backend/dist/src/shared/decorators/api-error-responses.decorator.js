"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorResponses = ApiErrorResponses;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const error_response_dto_1 = require("../dto/error-response.dto");
function ApiErrorResponses(...statusCodes) {
    const decorators = [];
    statusCodes.forEach((status) => {
        switch (status) {
            case 400:
                decorators.push((0, swagger_1.ApiResponse)({
                    status: 400,
                    description: 'Dados inválidos',
                    type: error_response_dto_1.ErrorResponseDto,
                }));
                break;
            case 401:
                decorators.push((0, swagger_1.ApiResponse)({
                    status: 401,
                    description: 'Não autorizado',
                    type: error_response_dto_1.ErrorResponseDto,
                }));
                break;
            case 403:
                decorators.push((0, swagger_1.ApiResponse)({
                    status: 403,
                    description: 'Acesso negado',
                    type: error_response_dto_1.ErrorResponseDto,
                }));
                break;
            case 404:
                decorators.push((0, swagger_1.ApiResponse)({
                    status: 404,
                    description: 'Recurso não encontrado',
                    type: error_response_dto_1.ErrorResponseDto,
                }));
                break;
            case 409:
                decorators.push((0, swagger_1.ApiResponse)({
                    status: 409,
                    description: 'Conflito de dados',
                    type: error_response_dto_1.ErrorResponseDto,
                }));
                break;
            case 500:
                decorators.push((0, swagger_1.ApiResponse)({
                    status: 500,
                    description: 'Erro interno do servidor',
                    type: error_response_dto_1.ErrorResponseDto,
                }));
                break;
        }
    });
    return (0, common_1.applyDecorators)(...decorators);
}
//# sourceMappingURL=api-error-responses.decorator.js.map