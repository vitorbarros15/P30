"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockPagination = exports.mockCandidates = exports.mockCandidate = exports.createMockCandidateModel = void 0;
const createMockCandidateModel = () => {
    const MockCandidateConstructor = jest.fn().mockImplementation((data) => ({
        ...data,
        _id: '507f1f77bcf86cd799439011',
        save: jest.fn().mockResolvedValue({
            _id: '507f1f77bcf86cd799439011',
            ...data,
        }),
    }));
    MockCandidateConstructor.findOne = jest.fn();
    MockCandidateConstructor.findById = jest.fn();
    MockCandidateConstructor.find = jest.fn();
    MockCandidateConstructor.findByIdAndUpdate = jest.fn();
    MockCandidateConstructor.findByIdAndDelete = jest.fn();
    MockCandidateConstructor.countDocuments = jest.fn();
    MockCandidateConstructor.findByIdAndUpdate.mockReturnValue({
        lean: jest.fn().mockResolvedValue({}),
    });
    const mockQuery = {
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([]),
    };
    MockCandidateConstructor.find.mockReturnValue(mockQuery);
    return MockCandidateConstructor;
};
exports.createMockCandidateModel = createMockCandidateModel;
exports.mockCandidate = {
    _id: '507f1f77bcf86cd799439011',
    name: 'João Silva',
    email: 'joao@email.com',
    skills: ['javascript', 'node.js', 'react'],
    experienceYears: 3,
    isInvited: false,
    createdAt: new Date(),
    updatedAt: new Date(),
};
exports.mockCandidates = [exports.mockCandidate];
exports.mockPagination = {
    page: 1,
    limit: 10,
    total: 1,
    totalPages: 1,
};
//# sourceMappingURL=candidate-mocks.js.map