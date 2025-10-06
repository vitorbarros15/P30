import { Model } from 'mongoose';

export const createMockMongooseModel = (mockData: any = {}) => {
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

export const createMockUserModel = () => createMockMongooseModel({
  findOne: jest.fn(),
  findById: jest.fn(),
  constructor: jest.fn(),
});

export const createMockJobModel = () => createMockMongooseModel({
  findOne: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
  countDocuments: jest.fn(),
  constructor: jest.fn(),
});

export const createMockCandidateModel = () => createMockMongooseModel({
  findOne: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
  countDocuments: jest.fn(),
  constructor: jest.fn(),
});
