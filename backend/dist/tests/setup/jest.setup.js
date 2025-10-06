"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env.test' });
global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};
jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));
jest.mock('@nestjs/jwt', () => ({
    JwtService: jest.fn().mockImplementation(() => ({
        sign: jest.fn(),
        verify: jest.fn(),
    })),
}));
jest.mock('mongoose', () => ({
    ...jest.requireActual('mongoose'),
    connect: jest.fn(),
    disconnect: jest.fn(),
}));
jest.setTimeout(10000);
global.testUtils = {
    createMockUser: require('../utils/test-helpers').createMockUser,
    createMockJob: require('../utils/test-helpers').createMockJob,
    createMockCandidate: require('../utils/test-helpers').createMockCandidate,
    createMockAuthResponse: require('../utils/test-helpers').createMockAuthResponse,
    createMockJobResponse: require('../utils/test-helpers').createMockJobResponse,
    createMockCandidateResponse: require('../utils/test-helpers').createMockCandidateResponse,
};
//# sourceMappingURL=jest.setup.js.map