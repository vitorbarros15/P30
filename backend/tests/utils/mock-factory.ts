import { Model } from 'mongoose';

export class MockModelFactory {
  static createMockModel(mockData: any = {}) {
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

export const createMockUserModel = () => MockModelFactory.createMockUserModel();
export const createMockJobModel = () => MockModelFactory.createMockJobModel();
export const createMockCandidateModel = () => MockModelFactory.createMockCandidateModel();
