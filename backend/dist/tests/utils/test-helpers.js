"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockPagination = exports.createMockJwtPayload = exports.createMockNotFoundError = exports.createMockUnauthorizedError = exports.createMockConflictError = exports.createMockValidationError = exports.createMockPaginationResponse = exports.createMockCandidateResponse = exports.createMockJobResponse = exports.createMockAuthResponse = exports.createMockCandidate = exports.createMockJob = exports.createMockUser = exports.createMockCandidateQueryDto = exports.createMockUpdateCandidateDto = exports.createMockCreateCandidateDto = exports.createMockJobQueryDto = exports.createMockUpdateJobDto = exports.createMockCreateJobDto = exports.createMockLoginDto = exports.createMockRegisterDto = void 0;
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
const createMockCreateJobDto = (overrides = {}) => ({
    title: 'Desenvolvedor Full Stack',
    description: 'Desenvolver aplicações web completas',
    location: 'São Paulo, SP',
    salaryRange: 'R$ 5.000 - R$ 8.000',
    skills: ['JavaScript', 'React', 'Node.js'],
    ...overrides,
});
exports.createMockCreateJobDto = createMockCreateJobDto;
const createMockUpdateJobDto = (overrides = {}) => ({
    title: 'Desenvolvedor Full Stack Senior',
    ...overrides,
});
exports.createMockUpdateJobDto = createMockUpdateJobDto;
const createMockJobQueryDto = (overrides = {}) => ({
    page: 1,
    limit: 10,
    ...overrides,
});
exports.createMockJobQueryDto = createMockJobQueryDto;
const createMockCreateCandidateDto = (overrides = {}) => ({
    name: 'João Silva',
    email: 'joao@email.com',
    skills: ['JavaScript', 'React', 'Node.js'],
    experienceYears: 3,
    ...overrides,
});
exports.createMockCreateCandidateDto = createMockCreateCandidateDto;
const createMockUpdateCandidateDto = (overrides = {}) => ({
    name: 'João Silva Santos',
    ...overrides,
});
exports.createMockUpdateCandidateDto = createMockUpdateCandidateDto;
const createMockCandidateQueryDto = (overrides = {}) => ({
    page: 1,
    limit: 10,
    ...overrides,
});
exports.createMockCandidateQueryDto = createMockCandidateQueryDto;
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
const createMockJob = (overrides = {}) => ({
    _id: '507f1f77bcf86cd799439011',
    title: 'Desenvolvedor Full Stack',
    description: 'Desenvolver aplicações web completas',
    location: 'São Paulo, SP',
    salaryRange: 'R$ 5.000 - R$ 8.000',
    skills: ['javascript', 'react', 'node.js'],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});
exports.createMockJob = createMockJob;
const createMockCandidate = (overrides = {}) => ({
    _id: '507f1f77bcf86cd799439011',
    name: 'João Silva',
    email: 'joao@email.com',
    skills: ['javascript', 'react', 'node.js'],
    experienceYears: 3,
    isInvited: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});
exports.createMockCandidate = createMockCandidate;
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
const createMockJobResponse = (job) => ({
    success: true,
    message: 'Job operation successful',
    data: job,
});
exports.createMockJobResponse = createMockJobResponse;
const createMockCandidateResponse = (candidate) => ({
    success: true,
    message: 'Candidate operation successful',
    data: candidate,
});
exports.createMockCandidateResponse = createMockCandidateResponse;
const createMockPaginationResponse = (items, pagination) => ({
    success: true,
    data: {
        items,
        pagination,
    },
});
exports.createMockPaginationResponse = createMockPaginationResponse;
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
const createMockNotFoundError = (resource, id) => ({
    message: `${resource} com ID ${id} não encontrado`,
    statusCode: 404,
});
exports.createMockNotFoundError = createMockNotFoundError;
const createMockJwtPayload = (user) => ({
    email: user.email,
    sub: user._id,
});
exports.createMockJwtPayload = createMockJwtPayload;
const createMockPagination = (overrides = {}) => ({
    page: 1,
    limit: 10,
    total: 1,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
    ...overrides,
});
exports.createMockPagination = createMockPagination;
//# sourceMappingURL=test-helpers.js.map