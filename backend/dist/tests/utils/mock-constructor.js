"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockCandidateConstructor = exports.createMockJobConstructor = exports.createMockUserConstructor = exports.createMockConstructor = void 0;
const createMockConstructor = (mockData = {}) => {
    return jest.fn().mockImplementation((data) => ({
        ...data,
        save: jest.fn().mockResolvedValue({
            _id: '507f1f77bcf86cd799439011',
            ...data,
        }),
        ...mockData,
    }));
};
exports.createMockConstructor = createMockConstructor;
const createMockUserConstructor = () => {
    const mockConstructor = (0, exports.createMockConstructor)();
    return {
        findOne: jest.fn(),
        findById: jest.fn(),
        constructor: mockConstructor,
        save: jest.fn(),
    };
};
exports.createMockUserConstructor = createMockUserConstructor;
const createMockJobConstructor = () => {
    const mockConstructor = (0, exports.createMockConstructor)();
    return {
        findOne: jest.fn(),
        findById: jest.fn(),
        find: jest.fn(),
        countDocuments: jest.fn(),
        constructor: mockConstructor,
        save: jest.fn(),
    };
};
exports.createMockJobConstructor = createMockJobConstructor;
const createMockCandidateConstructor = () => {
    const mockConstructor = (0, exports.createMockConstructor)();
    return {
        findOne: jest.fn(),
        findById: jest.fn(),
        find: jest.fn(),
        countDocuments: jest.fn(),
        constructor: mockConstructor,
        save: jest.fn(),
    };
};
exports.createMockCandidateConstructor = createMockCandidateConstructor;
//# sourceMappingURL=mock-constructor.js.map