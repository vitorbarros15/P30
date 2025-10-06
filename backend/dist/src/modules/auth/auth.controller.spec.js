"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const common_1 = require("@nestjs/common");
describe('AuthController', () => {
    let controller;
    let authService;
    const mockAuthService = {
        register: jest.fn(),
        login: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [auth_controller_1.AuthController],
            providers: [
                {
                    provide: auth_service_1.AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile();
        controller = module.get(auth_controller_1.AuthController);
        authService = module.get(auth_service_1.AuthService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('register', () => {
        const registerDto = {
            name: 'João Silva',
            email: 'joao@email.com',
            password: '123456',
        };
        it('should register a new user successfully', async () => {
            const expectedResponse = {
                success: true,
                message: 'Usuário criado com sucesso',
                data: {
                    user: {
                        id: '507f1f77bcf86cd799439011',
                        email: 'joao@email.com',
                        name: 'João Silva',
                        role: 'user',
                    },
                    token: 'jwt-token',
                },
            };
            mockAuthService.register.mockResolvedValue(expectedResponse);
            const result = await controller.register(registerDto);
            expect(result).toEqual(expectedResponse);
            expect(authService.register).toHaveBeenCalledWith(registerDto);
            expect(authService.register).toHaveBeenCalledTimes(1);
        });
        it('should throw ConflictException when user already exists', async () => {
            const conflictError = new common_1.ConflictException('Usuário já existe com este email');
            mockAuthService.register.mockRejectedValue(conflictError);
            await expect(controller.register(registerDto)).rejects.toThrow(common_1.ConflictException);
            expect(authService.register).toHaveBeenCalledWith(registerDto);
        });
        it('should handle validation errors', async () => {
            const invalidDto = {
                name: '',
                email: 'invalid-email',
                password: '123',
            };
            const validationError = new Error('Validation failed');
            mockAuthService.register.mockRejectedValue(validationError);
            await expect(controller.register(invalidDto)).rejects.toThrow();
        });
    });
    describe('login', () => {
        const loginDto = {
            email: 'joao@email.com',
            password: '123456',
        };
        it('should login successfully with valid credentials', async () => {
            const expectedResponse = {
                success: true,
                message: 'Login realizado com sucesso',
                data: {
                    user: {
                        id: '507f1f77bcf86cd799439011',
                        email: 'joao@email.com',
                        name: 'João Silva',
                        role: 'user',
                    },
                    token: 'jwt-token',
                },
            };
            mockAuthService.login.mockResolvedValue(expectedResponse);
            const result = await controller.login(loginDto);
            expect(result).toEqual(expectedResponse);
            expect(authService.login).toHaveBeenCalledWith(loginDto);
            expect(authService.login).toHaveBeenCalledTimes(1);
        });
        it('should throw UnauthorizedException with invalid credentials', async () => {
            const unauthorizedError = new common_1.UnauthorizedException('Credenciais inválidas');
            mockAuthService.login.mockRejectedValue(unauthorizedError);
            await expect(controller.login(loginDto)).rejects.toThrow(common_1.UnauthorizedException);
            expect(authService.login).toHaveBeenCalledWith(loginDto);
        });
        it('should throw UnauthorizedException with wrong password', async () => {
            const wrongPasswordDto = {
                email: 'joao@email.com',
                password: 'wrongpassword',
            };
            const unauthorizedError = new common_1.UnauthorizedException('Credenciais inválidas');
            mockAuthService.login.mockRejectedValue(unauthorizedError);
            await expect(controller.login(wrongPasswordDto)).rejects.toThrow(common_1.UnauthorizedException);
        });
        it('should handle non-existent user', async () => {
            const nonExistentUserDto = {
                email: 'nonexistent@email.com',
                password: '123456',
            };
            const unauthorizedError = new common_1.UnauthorizedException('Credenciais inválidas');
            mockAuthService.login.mockRejectedValue(unauthorizedError);
            await expect(controller.login(nonExistentUserDto)).rejects.toThrow(common_1.UnauthorizedException);
        });
    });
});
//# sourceMappingURL=auth.controller.spec.js.map