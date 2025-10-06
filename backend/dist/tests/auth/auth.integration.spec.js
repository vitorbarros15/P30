"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const request = require("supertest");
const auth_controller_1 = require("../../src/modules/auth/auth.controller");
const auth_service_1 = require("../../src/modules/auth/auth.service");
const user_schema_1 = require("../../src/modules/auth/schemas/user.schema");
const auth_mocks_1 = require("../utils/auth-mocks");
describe('Auth Integration Tests', () => {
    let app;
    let userModel;
    let jwtService;
    const mockJwtService = (0, auth_mocks_1.createMockJwtService)();
    beforeAll(async () => {
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
        const moduleFixture = await testing_1.Test.createTestingModule({
            controllers: [auth_controller_1.AuthController],
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
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe());
        await app.init();
        userModel = moduleFixture.get((0, mongoose_1.getModelToken)(user_schema_1.User.name));
        jwtService = moduleFixture.get(jwt_1.JwtService);
    });
    afterAll(async () => {
        await app.close();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('POST /auth/register', () => {
        const validRegisterDto = {
            name: 'João Silva',
            email: 'joao@email.com',
            password: '123456',
        };
        it('should register a new user successfully', async () => {
            userModel.findOne.mockResolvedValue(null);
            mockJwtService.sign.mockReturnValue('jwt-token');
            const response = await request(app.getHttpServer())
                .post('/auth/register')
                .send(validRegisterDto)
                .expect(201);
            expect(response.body).toEqual({
                success: true,
                message: 'Usuário criado com sucesso',
                data: {
                    user: {
                        id: '507f1f77bcf86cd799439011',
                        email: validRegisterDto.email,
                        name: validRegisterDto.name,
                        role: undefined,
                    },
                    token: 'jwt-token',
                },
            });
        });
        it('should return 409 when user already exists', async () => {
            const existingUser = {
                _id: '507f1f77bcf86cd799439011',
                email: 'joao@email.com',
                name: 'João Silva',
            };
            userModel.findOne.mockResolvedValue(existingUser);
            await request(app.getHttpServer())
                .post('/auth/register')
                .send(validRegisterDto)
                .expect(409);
        });
        it('should return 400 for invalid data', async () => {
            const invalidDto = {
                name: '',
                email: 'invalid-email',
                password: '123',
            };
            await request(app.getHttpServer())
                .post('/auth/register')
                .send(invalidDto)
                .expect(400);
        });
        it('should validate required fields', async () => {
            const incompleteDto = {
                name: 'João Silva',
            };
            await request(app.getHttpServer())
                .post('/auth/register')
                .send(incompleteDto)
                .expect(400);
        });
    });
    describe('POST /auth/login', () => {
        const validLoginDto = {
            email: 'joao@email.com',
            password: '123456',
        };
        it('should login successfully with valid credentials', async () => {
            const mockUser = {
                _id: '507f1f77bcf86cd799439011',
                email: 'joao@email.com',
                name: 'João Silva',
                password: 'hashed-password',
                role: 'user',
                isActive: true,
            };
            userModel.findOne.mockResolvedValue(mockUser);
            mockJwtService.sign.mockReturnValue('jwt-token');
            const bcrypt = require('bcrypt');
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
            const response = await request(app.getHttpServer())
                .post('/auth/login')
                .send(validLoginDto)
                .expect(200);
            expect(response.body).toEqual({
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
        it('should return 401 for invalid credentials', async () => {
            userModel.findOne.mockResolvedValue(null);
            await request(app.getHttpServer())
                .post('/auth/login')
                .send(validLoginDto)
                .expect(401);
        });
        it('should return 401 for wrong password', async () => {
            const mockUser = {
                _id: '507f1f77bcf86cd799439011',
                email: 'joao@email.com',
                password: 'hashed-password',
                isActive: true,
            };
            userModel.findOne.mockResolvedValue(mockUser);
            const bcrypt = require('bcrypt');
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
            await request(app.getHttpServer())
                .post('/auth/login')
                .send(validLoginDto)
                .expect(401);
        });
        it('should return 400 for invalid email format', async () => {
            const invalidDto = {
                email: 'invalid-email',
                password: '123456',
            };
            await request(app.getHttpServer())
                .post('/auth/login')
                .send(invalidDto)
                .expect(400);
        });
        it('should return 400 for short password', async () => {
            const invalidDto = {
                email: 'joao@email.com',
                password: '123',
            };
            await request(app.getHttpServer())
                .post('/auth/login')
                .send(invalidDto)
                .expect(400);
        });
    });
    describe('Validation Tests', () => {
        it('should validate email format in register', async () => {
            const invalidDto = {
                name: 'João Silva',
                email: 'not-an-email',
                password: '123456',
            };
            await request(app.getHttpServer())
                .post('/auth/register')
                .send(invalidDto)
                .expect(400);
        });
        it('should validate name length in register', async () => {
            const invalidDto = {
                name: 'J',
                email: 'joao@email.com',
                password: '123456',
            };
            await request(app.getHttpServer())
                .post('/auth/register')
                .send(invalidDto)
                .expect(400);
        });
        it('should validate password length in register', async () => {
            const invalidDto = {
                name: 'João Silva',
                email: 'joao@email.com',
                password: '123',
            };
            await request(app.getHttpServer())
                .post('/auth/register')
                .send(invalidDto)
                .expect(400);
        });
    });
});
//# sourceMappingURL=auth.integration.spec.js.map