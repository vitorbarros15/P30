"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const business_exception_1 = require("../exceptions/business.exception");
let ValidationInterceptor = class ValidationInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)((error) => {
            if (error.response && Array.isArray(error.response.message)) {
                const validationErrors = error.response.message.map((msg) => {
                    const parts = msg.split(' ');
                    const field = parts[0];
                    const message = msg;
                    return { field, message, value: null };
                });
                return (0, rxjs_1.throwError)(() => new business_exception_1.ValidationException('Dados de entrada inválidos', { validationErrors }));
            }
            if (error.name === 'ZodError') {
                const validationErrors = error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                    value: issue.input,
                }));
                return (0, rxjs_1.throwError)(() => new business_exception_1.ValidationException('Dados de entrada inválidos', { validationErrors }));
            }
            return (0, rxjs_1.throwError)(() => error);
        }));
    }
};
exports.ValidationInterceptor = ValidationInterceptor;
exports.ValidationInterceptor = ValidationInterceptor = __decorate([
    (0, common_1.Injectable)()
], ValidationInterceptor);
//# sourceMappingURL=validation.interceptor.js.map