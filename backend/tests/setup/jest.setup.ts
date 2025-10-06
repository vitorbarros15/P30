import { config } from 'dotenv';

// Load environment variables for testing
config({ path: '.env.test' });

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock bcrypt to avoid actual hashing in tests
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

// Mock JWT service
jest.mock('@nestjs/jwt', () => ({
  JwtService: jest.fn().mockImplementation(() => ({
    sign: jest.fn(),
    verify: jest.fn(),
  })),
}));

// Mock MongoDB
jest.mock('mongoose', () => ({
  ...jest.requireActual('mongoose'),
  connect: jest.fn(),
  disconnect: jest.fn(),
}));

// Global test timeout
jest.setTimeout(10000);

// Global test utilities
global.testUtils = {
  createMockUser: require('../utils/test-helpers').createMockUser,
  createMockJob: require('../utils/test-helpers').createMockJob,
  createMockCandidate: require('../utils/test-helpers').createMockCandidate,
  createMockAuthResponse: require('../utils/test-helpers').createMockAuthResponse,
  createMockJobResponse: require('../utils/test-helpers').createMockJobResponse,
  createMockCandidateResponse: require('../utils/test-helpers').createMockCandidateResponse,
};
