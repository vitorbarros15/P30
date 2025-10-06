"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const register_dto_1 = require("./register.dto");
const login_dto_1 = require("./login.dto");
describe('Auth DTOs', () => {
    describe('RegisterDto', () => {
        it('should validate a valid register DTO', async () => {
            const validDto = {
                name: 'João Silva',
                email: 'joao@email.com',
                password: '123456',
            };
            const dto = (0, class_transformer_1.plainToClass)(register_dto_1.RegisterDto, validDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(0);
        });
        it('should fail validation with empty name', async () => {
            const invalidDto = {
                name: '',
                email: 'joao@email.com',
                password: '123456',
            };
            const dto = (0, class_transformer_1.plainToClass)(register_dto_1.RegisterDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('name');
            expect(errors[0].constraints?.minLength).toBeDefined();
        });
        it('should fail validation with name too short', async () => {
            const invalidDto = {
                name: 'J',
                email: 'joao@email.com',
                password: '123456',
            };
            const dto = (0, class_transformer_1.plainToClass)(register_dto_1.RegisterDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('name');
        });
        it('should fail validation with name too long', async () => {
            const invalidDto = {
                name: 'A'.repeat(101),
                email: 'joao@email.com',
                password: '123456',
            };
            const dto = (0, class_transformer_1.plainToClass)(register_dto_1.RegisterDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('name');
        });
        it('should fail validation with invalid email', async () => {
            const invalidDto = {
                name: 'João Silva',
                email: 'invalid-email',
                password: '123456',
            };
            const dto = (0, class_transformer_1.plainToClass)(register_dto_1.RegisterDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('email');
        });
        it('should fail validation with short password', async () => {
            const invalidDto = {
                name: 'João Silva',
                email: 'joao@email.com',
                password: '123',
            };
            const dto = (0, class_transformer_1.plainToClass)(register_dto_1.RegisterDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('password');
        });
        it('should fail validation with missing required fields', async () => {
            const invalidDto = {};
            const dto = (0, class_transformer_1.plainToClass)(register_dto_1.RegisterDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors.length).toBeGreaterThan(0);
            expect(errors.some(error => error.property === 'name')).toBe(true);
            expect(errors.some(error => error.property === 'email')).toBe(true);
            expect(errors.some(error => error.property === 'password')).toBe(true);
        });
    });
    describe('LoginDto', () => {
        it('should validate a valid login DTO', async () => {
            const validDto = {
                email: 'joao@email.com',
                password: '123456',
            };
            const dto = (0, class_transformer_1.plainToClass)(login_dto_1.LoginDto, validDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(0);
        });
        it('should fail validation with invalid email', async () => {
            const invalidDto = {
                email: 'invalid-email',
                password: '123456',
            };
            const dto = (0, class_transformer_1.plainToClass)(login_dto_1.LoginDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('email');
        });
        it('should fail validation with short password', async () => {
            const invalidDto = {
                email: 'joao@email.com',
                password: '123',
            };
            const dto = (0, class_transformer_1.plainToClass)(login_dto_1.LoginDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('password');
        });
        it('should fail validation with missing required fields', async () => {
            const invalidDto = {};
            const dto = (0, class_transformer_1.plainToClass)(login_dto_1.LoginDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors.length).toBeGreaterThan(0);
            expect(errors.some(error => error.property === 'email')).toBe(true);
            expect(errors.some(error => error.property === 'password')).toBe(true);
        });
    });
});
//# sourceMappingURL=auth.dto.spec.js.map