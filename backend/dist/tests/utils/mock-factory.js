"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockCandidateModel = exports.createMockJobModel = exports.createMockUserModel = exports.MockModelFactory = void 0;
class MockModelFactory {
    static createMockModel(mockData = {}) {
        const MockConstructor = jest.fn().mockImplementation((data) => ({
            ...data,
            save: jest.fn().mockResolvedValue({
                _id: '507f1f77bcf86cd799439011',
                ...data,
            }),
        }));
        return {
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
    }
    static createMockUserModel() {
        return this.createMockModel({
            findOne: jest.fn(),
            findById: jest.fn(),
        });
    }
    static createMockJobModel() {
        return this.createMockModel({
            findOne: jest.fn(),
            findById: jest.fn(),
            find: jest.fn(),
            countDocuments: jest.fn(),
        });
    }
    static createMockCandidateModel() {
        return this.createMockModel({
            findOne: jest.fn(),
            findById: jest.fn(),
            find: jest.fn(),
            countDocuments: jest.fn(),
        });
    }
}
exports.MockModelFactory = MockModelFactory;
const createMockUserModel = () => MockModelFactory.createMockUserModel();
exports.createMockUserModel = createMockUserModel;
const createMockJobModel = () => MockModelFactory.createMockJobModel();
exports.createMockJobModel = createMockJobModel;
const createMockCandidateModel = () => MockModelFactory.createMockCandidateModel();
exports.createMockCandidateModel = createMockCandidateModel;
//# sourceMappingURL=mock-factory.js.map