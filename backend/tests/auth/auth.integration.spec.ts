import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as request from 'supertest';
import { AuthController } from '../../src/modules/auth/auth.controller';
import { AuthService } from '../../src/modules/auth/auth.service';
import { User } from '../../src/modules/auth/schemas/user.schema';
import { RegisterDto } from '../../src/modules/auth/dto/register.dto';
import { LoginDto } from '../../src/modules/auth/dto/login.dto';
import { createMockJwtService } from '../utils/auth-mocks';

describe('Auth Integration Tests', () => {
  let app: INestApplication;
  let userModel: any;
  let jwtService: JwtService;

  const mockJwtService = createMockJwtService();

  beforeAll(async () => {
    const MockUserConstructor = jest.fn().mockImplementation((data) => ({
      ...data,
      _id: '507f1f77bcf86cd799439011',
      save: jest.fn().mockResolvedValue({
        _id: '507f1f77bcf86cd799439011',
        ...data,
      }),
    })) as any;

    MockUserConstructor.findOne = jest.fn();
    MockUserConstructor.findById = jest.fn();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: MockUserConstructor,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    userModel = moduleFixture.get<any>(getModelToken(User.name));
    jwtService = moduleFixture.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/register', () => {
    const validRegisterDto: RegisterDto = {
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
    const validLoginDto: LoginDto = {
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
