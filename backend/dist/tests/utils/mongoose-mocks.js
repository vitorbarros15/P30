"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockCandidateModel = exports.createMockJobModel = exports.createMockUserModel = exports.createMockMongooseModel = void 0;
const createMockMongooseModel = (mockData = {}) => {
    const MockConstructor = jest.fn().mockImplementation((data) => ({
        ...data,
        save: jest.fn().mockResolvedValue(data),
    }));
    const mockModel = {
        findOne: jest.fn(),
        findById: jest.fn(),
        find: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
        countDocuments: jest.fn(),
        constructor: MockConstructor,
        save: jest.fn(),
        ...mockData,
    };
    return mockModel;
};
exports.createMockMongooseModel = createMockMongooseModel;
const createMockUserModel = () => (0, exports.createMockMongooseModel)({
    findOne: jest.fn(),
    findById: jest.fn(),
    constructor: jest.fn(),
});
exports.createMockUserModel = createMockUserModel;
const createMockJobModel = () => (0, exports.createMockMongooseModel)({
    findOne: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
    countDocuments: jest.fn(),
    constructor: jest.fn(),
});
exports.createMockJobModel = createMockJobModel;
const createMockCandidateModel = () => (0, exports.createMockMongooseModel)({
    findOne: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
    countDocuments: jest.fn(),
    constructor: jest.fn(),
});
exports.createMockCandidateModel = createMockCandidateModel;
//# sourceMappingURL=mongoose-mocks.js.map