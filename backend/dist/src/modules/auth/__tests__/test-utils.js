"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockUnauthorizedError = exports.createMockConflictError = exports.createMockValidationError = exports.createMockJwtPayload = exports.createMockInactiveUser = exports.createMockAdminUser = exports.createMockAuthResponse = exports.createMockLoginDto = exports.createMockRegisterDto = exports.createMockUser = void 0;
const createMockUser = (overrides = {}) => ({
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
exports.createMockUser = createMockUser;
const createMockRegisterDto = (overrides = {}) => ({
    name: 'João Silva',
    email: 'joao@email.com',
    password: '123456',
    ...overrides,
});
exports.createMockRegisterDto = createMockRegisterDto;
const createMockLoginDto = (overrides = {}) => ({
    email: 'joao@email.com',
    password: '123456',
    ...overrides,
});
exports.createMockLoginDto = createMockLoginDto;
const createMockAuthResponse = (user, token = 'jwt-token') => ({
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
exports.createMockAuthResponse = createMockAuthResponse;
const createMockAdminUser = () => (0, exports.createMockUser)({
    email: 'admin@p30.com',
    name: 'Admin P30',
    role: 'admin',
});
exports.createMockAdminUser = createMockAdminUser;
const createMockInactiveUser = () => (0, exports.createMockUser)({
    isActive: false,
});
exports.createMockInactiveUser = createMockInactiveUser;
const createMockJwtPayload = (user) => ({
    email: user.email,
    sub: user._id,
});
exports.createMockJwtPayload = createMockJwtPayload;
const createMockValidationError = (field, message) => ({
    field,
    message,
    value: null,
});
exports.createMockValidationError = createMockValidationError;
const createMockConflictError = (message, details) => ({
    message,
    details,
    statusCode: 409,
});
exports.createMockConflictError = createMockConflictError;
const createMockUnauthorizedError = (message = 'Credenciais inválidas') => ({
    message,
    statusCode: 401,
});
exports.createMockUnauthorizedError = createMockUnauthorizedError;
//# sourceMappingURL=test-utils.js.map