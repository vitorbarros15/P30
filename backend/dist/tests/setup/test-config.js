"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTestEnvironment = exports.createMockJwtProvider = exports.createMockModelProvider = exports.createTestModule = void 0;
const testing_1 = require("@nestjs/testing");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const createTestModule = async (controllers, providers) => {
    return await testing_1.Test.createTestingModule({
        controllers,
        providers,
    }).compile();
};
exports.createTestModule = createTestModule;
const createMockModelProvider = (modelName, mockModel) => ({
    provide: (0, mongoose_1.getModelToken)(modelName),
    useValue: mockModel,
});
exports.createMockModelProvider = createMockModelProvider;
const createMockJwtProvider = (mockJwt) => ({
    provide: jwt_1.JwtService,
    useValue: mockJwt,
});
exports.createMockJwtProvider = createMockJwtProvider;
const setupTestEnvironment = () => {
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
exports.setupTestEnvironment = setupTestEnvironment;
//# sourceMappingURL=test-config.js.map