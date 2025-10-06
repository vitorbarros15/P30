"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockBcrypt = exports.createMockJwtService = exports.createMockUserModel = void 0;
const createMockUserModel = () => {
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
exports.createMockUserModel = createMockUserModel;
const createMockJwtService = () => ({
    sign: jest.fn().mockReturnValue('jwt-token'),
    verify: jest.fn(),
});
exports.createMockJwtService = createMockJwtService;
const createMockBcrypt = () => ({
    hash: jest.fn().mockResolvedValue('hashed-password'),
    compare: jest.fn().mockResolvedValue(true),
});
exports.createMockBcrypt = createMockBcrypt;
//# sourceMappingURL=auth-mocks.js.map