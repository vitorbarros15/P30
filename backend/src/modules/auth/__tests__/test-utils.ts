import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

export const createMockUser = (overrides: any = {}) => ({
  _id: '507f1f77bcf86cd799439011',
  email: 'joao@email.com',
  name: 'João Silva',
  password: 'hashed-password',
  role: 'user',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createMockRegisterDto = (overrides: Partial<RegisterDto> = {}): RegisterDto => ({
  name: 'João Silva',
  email: 'joao@email.com',
  password: '123456',
  ...overrides,
});

export const createMockLoginDto = (overrides: Partial<LoginDto> = {}): LoginDto => ({
  email: 'joao@email.com',
  password: '123456',
  ...overrides,
});

export const createMockAuthResponse = (user: any, token: string = 'jwt-token') => ({
  success: true,
  message: 'Operation successful',
  data: {
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  },
});

export const createMockAdminUser = () => createMockUser({
  email: 'admin@p30.com',
  name: 'Admin P30',
  role: 'admin',
});

export const createMockInactiveUser = () => createMockUser({
  isActive: false,
});

export const createMockJwtPayload = (user: any) => ({
  email: user.email,
  sub: user._id,
});

export const createMockValidationError = (field: string, message: string) => ({
  field,
  message,
  value: null,
});

export const createMockConflictError = (message: string, details?: any) => ({
  message,
  details,
  statusCode: 409,
});

export const createMockUnauthorizedError = (message: string = 'Credenciais inválidas') => ({
  message,
  statusCode: 401,
});
