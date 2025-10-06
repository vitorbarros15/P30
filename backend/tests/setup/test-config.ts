import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

export const createTestModule = async (controllers: any[], providers: any[]) => {
  return await Test.createTestingModule({
    controllers,
    providers,
  }).compile();
};

export const createMockModelProvider = (modelName: string, mockModel: any) => ({
  provide: getModelToken(modelName),
  useValue: mockModel,
});

export const createMockJwtProvider = (mockJwt: any) => ({
  provide: JwtService,
  useValue: mockJwt,
});

export const setupTestEnvironment = () => {
  
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };

  
  jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashed-password'),
    compare: jest.fn().mockResolvedValue(true),
  }));

  
  jest.mock('@nestjs/jwt', () => ({
    JwtService: jest.fn().mockImplementation(() => ({
      sign: jest.fn().mockReturnValue('jwt-token'),
      verify: jest.fn(),
    })),
  }));

  
  jest.mock('mongoose', () => ({
    ...jest.requireActual('mongoose'),
    connect: jest.fn(),
    disconnect: jest.fn(),
  }));
};
