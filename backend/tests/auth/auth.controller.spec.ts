import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/modules/auth/auth.controller';
import { AuthService } from '../../src/modules/auth/auth.service';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from '../../src/modules/auth/dto/register.dto';
import { LoginDto } from '../../src/modules/auth/dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    const registerDto: RegisterDto = {
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
      const conflictError = new ConflictException('Usuário já existe com este email');
      mockAuthService.register.mockRejectedValue(conflictError);

      await expect(controller.register(registerDto)).rejects.toThrow(ConflictException);
      expect(authService.register).toHaveBeenCalledWith(registerDto);
    });

    it('should handle validation errors', async () => {
      const invalidDto = {
        name: '',
        email: 'invalid-email',
        password: '123',
      } as RegisterDto;

      const validationError = new Error('Validation failed');
      mockAuthService.register.mockRejectedValue(validationError);

      await expect(controller.register(invalidDto)).rejects.toThrow();
    });
  });

  describe('login', () => {
    const loginDto: LoginDto = {
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
      const unauthorizedError = new UnauthorizedException('Credenciais inválidas');
      mockAuthService.login.mockRejectedValue(unauthorizedError);

      await expect(controller.login(loginDto)).rejects.toThrow(UnauthorizedException);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });

    it('should throw UnauthorizedException with wrong password', async () => {
      const wrongPasswordDto = {
        email: 'joao@email.com',
        password: 'wrongpassword',
      };

      const unauthorizedError = new UnauthorizedException('Credenciais inválidas');
      mockAuthService.login.mockRejectedValue(unauthorizedError);

      await expect(controller.login(wrongPasswordDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should handle non-existent user', async () => {
      const nonExistentUserDto = {
        email: 'nonexistent@email.com',
        password: '123456',
      };

      const unauthorizedError = new UnauthorizedException('Credenciais inválidas');
      mockAuthService.login.mockRejectedValue(unauthorizedError);

      await expect(controller.login(nonExistentUserDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
