import { Model } from 'mongoose';

export const createMockUserModel = () => {
  const mockUser = {
    _id: '507f1f77bcf86cd799439011',
    email: 'joao@email.com',
    name: 'João Silva',
    password: 'hashed-password',
    role: 'user',
    isActive: true,
    save: jest.fn().mockResolvedValue({}),
  };

  const MockUserConstructor = jest.fn().mockImplementation((data) => ({
    ...data,
    save: jest.fn().mockResolvedValue(mockUser),
  }));

  return {
    findOne: jest.fn(),
    findById: jest.fn(),
    constructor: MockUserConstructor,
    save: jest.fn(),
  };
};

export const createMockJwtService = () => ({
  sign: jest.fn().mockReturnValue('jwt-token'),
  verify: jest.fn(),
});

export const createMockBcrypt = () => ({
  hash: jest.fn().mockResolvedValue('hashed-password'),
  compare: jest.fn().mockResolvedValue(true),
});
