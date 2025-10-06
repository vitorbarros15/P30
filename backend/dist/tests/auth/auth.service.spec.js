"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const auth_service_1 = require("../../src/modules/auth/auth.service");
const user_schema_1 = require("../../src/modules/auth/schemas/user.schema");
const auth_mocks_1 = require("../utils/auth-mocks");
jest.mock('bcrypt');
const mockedBcrypt = bcrypt;
describe('AuthService', () => {
    let service;
    let userModel;
    let jwtService;
    const mockJwtService = (0, auth_mocks_1.createMockJwtService)();
    const mockUser = {
        _id: '507f1f77bcf86cd799439011',
        email: 'joao@email.com',
        name: 'João Silva',
        password: 'hashed-password',
        role: 'user',
        isActive: true,
        save: jest.fn(),
    };
    beforeEach(async () => {
        const MockUserConstructor = jest.fn().mockImplementation((data) => ({
            ...data,
            _id: '507f1f77bcf86cd799439011',
            save: jest.fn().mockResolvedValue({
                _id: '507f1f77bcf86cd799439011',
                ...data,
            }),
        }));
        MockUserConstructor.findOne = jest.fn();
        MockUserConstructor.findById = jest.fn();
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                {
                    provide: (0, mongoose_1.getModelToken)(user_schema_1.User.name),
                    useValue: MockUserConstructor,
                },
                {
                    provide: jwt_1.JwtService,
                    useValue: mockJwtService,
                },
            ],
        }).compile();
        service = module.get(auth_service_1.AuthService);
        userModel = module.get((0, mongoose_1.getModelToken)(user_schema_1.User.name));
        jwtService = module.get(jwt_1.JwtService);
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
            userModel.findOne.mockResolvedValue(null);
            mockedBcrypt.hash.mockResolvedValue('hashed-password');
            mockJwtService.sign.mockReturnValue('jwt-token');
            const result = await service.register(registerDto);
            expect(userModel.findOne).toHaveBeenCalledWith({ email: registerDto.email });
            expect(mockedBcrypt.hash).toHaveBeenCalledWith(registerDto.password, 10);
            expect(mockJwtService.sign).toHaveBeenCalledWith({
                email: registerDto.email,
                sub: '507f1f77bcf86cd799439011',
            });
            expect(result).toEqual({
                success: true,
                message: 'Usuário criado com sucesso',
                data: {
                    user: {
                        id: '507f1f77bcf86cd799439011',
                        email: registerDto.email,
                        name: registerDto.name,
                        role: undefined,
                    },
                    token: 'jwt-token',
                },
            });
        });
        it('should throw ConflictException when user already exists', async () => {
            userModel.findOne.mockResolvedValue(mockUser);
            await expect(service.register(registerDto)).rejects.toThrow(common_1.ConflictException);
            expect(userModel.findOne).toHaveBeenCalledWith({ email: registerDto.email });
        });
        it('should hash password with correct salt rounds', async () => {
            userModel.findOne.mockResolvedValue(null);
            mockedBcrypt.hash.mockResolvedValue('hashed-password');
            mockJwtService.sign.mockReturnValue('jwt-token');
            await service.register(registerDto);
            expect(mockedBcrypt.hash).toHaveBeenCalledWith(registerDto.password, 10);
        });
    });
    describe('login', () => {
        const loginDto = {
            email: 'joao@email.com',
            password: '123456',
        };
        it('should login successfully with valid credentials', async () => {
            userModel.findOne.mockResolvedValue(mockUser);
            mockedBcrypt.compare.mockResolvedValue(true);
            mockJwtService.sign.mockReturnValue('jwt-token');
            const result = await service.login(loginDto);
            expect(userModel.findOne).toHaveBeenCalledWith({
                email: loginDto.email,
                isActive: true,
            });
            expect(mockedBcrypt.compare).toHaveBeenCalledWith(loginDto.password, mockUser.password);
            expect(mockJwtService.sign).toHaveBeenCalledWith({
                email: mockUser.email,
                sub: mockUser._id,
            });
            expect(result).toEqual({
                success: true,
                message: 'Login realizado com sucesso',
                data: {
                    user: {
                        id: mockUser._id,
                        email: mockUser.email,
                        name: mockUser.name,
                        role: mockUser.role,
                    },
                    token: 'jwt-token',
                },
            });
        });
        it('should throw UnauthorizedException when user not found', async () => {
            userModel.findOne.mockResolvedValue(null);
            await expect(service.login(loginDto)).rejects.toThrow(common_1.UnauthorizedException);
            expect(userModel.findOne).toHaveBeenCalledWith({
                email: loginDto.email,
                isActive: true,
            });
        });
        it('should throw UnauthorizedException when password is invalid', async () => {
            userModel.findOne.mockResolvedValue(mockUser);
            mockedBcrypt.compare.mockResolvedValue(false);
            await expect(service.login(loginDto)).rejects.toThrow(common_1.UnauthorizedException);
            expect(mockedBcrypt.compare).toHaveBeenCalledWith(loginDto.password, mockUser.password);
        });
        it('should throw UnauthorizedException when user is inactive', async () => {
            const inactiveUser = { ...mockUser, isActive: false };
            userModel.findOne.mockResolvedValue(null);
            await expect(service.login(loginDto)).rejects.toThrow(common_1.UnauthorizedException);
        });
    });
    describe('validateUser', () => {
        it('should return user without password', async () => {
            const userWithoutPassword = {
                _id: mockUser._id,
                email: mockUser.email,
                name: mockUser.name,
                role: mockUser.role,
                isActive: mockUser.isActive,
            };
            userModel.findById.mockReturnValue({
                select: jest.fn().mockResolvedValue(userWithoutPassword),
            });
            const result = await service.validateUser(mockUser._id);
            expect(userModel.findById).toHaveBeenCalledWith(mockUser._id);
            expect(result).toEqual(userWithoutPassword);
        });
        it('should return null when user not found', async () => {
            userModel.findById.mockReturnValue({
                select: jest.fn().mockResolvedValue(null),
            });
            const result = await service.validateUser('nonexistent-id');
            expect(result).toBeNull();
        });
    });
    describe('createDefaultUser', () => {
        it('should create admin user when not exists', async () => {
            userModel.findOne.mockResolvedValue(null);
            mockedBcrypt.hash.mockResolvedValue('hashed-admin-password');
            await service.createDefaultUser();
            expect(userModel.findOne).toHaveBeenCalledWith({ email: 'admin@p30.com' });
            expect(mockedBcrypt.hash).toHaveBeenCalledWith('123456', 10);
        });
        it('should not create admin user when already exists', async () => {
            const existingAdmin = { ...mockUser, email: 'admin@p30.com' };
            userModel.findOne.mockResolvedValue(existingAdmin);
            await service.createDefaultUser();
            expect(userModel.findOne).toHaveBeenCalledWith({ email: 'admin@p30.com' });
            expect(mockedBcrypt.hash).not.toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map