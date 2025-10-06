"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const request = require("supertest");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const auth_module_1 = require("../../src/modules/auth/auth.module");
describe('Auth Integration Tests (Real Database)', () => {
    let app;
    let mongoServer;
    let jwtService;
    beforeAll(async () => {
        mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [
                mongoose_1.MongooseModule.forRoot(mongoUri),
                auth_module_1.AuthModule,
            ],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe());
        await app.init();
        jwtService = moduleFixture.get(jwt_1.JwtService);
    });
    afterAll(async () => {
        await app.close();
        await mongoServer.stop();
    });
    describe('POST /auth/register', () => {
        it('should register a new user successfully', async () => {
            const validRegisterDto = {
                name: 'João Silva',
                email: 'joao@email.com',
                password: '123456',
            };
            const response = await request(app.getHttpServer())
                .post('/auth/register')
                .send(validRegisterDto)
                .expect(201);
            expect(response.body).toEqual({
                success: true,
                message: 'Usuário criado com sucesso',
                data: {
                    user: {
                        id: expect.any(String),
                        email: validRegisterDto.email,
                        name: validRegisterDto.name,
                        role: 'user',
                    },
                    token: expect.any(String),
                },
            });
        });
        it('should return 409 when user already exists', async () => {
            const validRegisterDto = {
                name: 'João Silva',
                email: 'joao@email.com',
                password: '123456',
            };
            await request(app.getHttpServer())
                .post('/auth/register')
                .send(validRegisterDto)
                .expect(201);
            await request(app.getHttpServer())
                .post('/auth/register')
                .send(validRegisterDto)
                .expect(409);
        });
        it('should return 400 for invalid data', async () => {
            const invalidRegisterDto = {
                name: '',
                email: 'invalid-email',
                password: '123',
            };
            await request(app.getHttpServer())
                .post('/auth/register')
                .send(invalidRegisterDto)
                .expect(400);
        });
    });
    describe('POST /auth/login', () => {
        beforeEach(async () => {
            const validRegisterDto = {
                name: 'Test User',
                email: 'test@email.com',
                password: '123456',
            };
            await request(app.getHttpServer())
                .post('/auth/register')
                .send(validRegisterDto);
        });
        it('should login successfully with valid credentials', async () => {
            const validLoginDto = {
                email: 'test@email.com',
                password: '123456',
            };
            const response = await request(app.getHttpServer())
                .post('/auth/login')
                .send(validLoginDto)
                .expect(200);
            expect(response.body).toEqual({
                success: true,
                message: 'Login realizado com sucesso',
                data: {
                    user: {
                        id: expect.any(String),
                        email: validLoginDto.email,
                        name: 'Test User',
                        role: 'user',
                    },
                    token: expect.any(String),
                },
            });
        });
        it('should return 401 for invalid credentials', async () => {
            const invalidLoginDto = {
                email: 'test@email.com',
                password: 'wrong-password',
            };
            await request(app.getHttpServer())
                .post('/auth/login')
                .send(invalidLoginDto)
                .expect(401);
        });
    });
});
//# sourceMappingURL=auth.integration.real.spec.js.map