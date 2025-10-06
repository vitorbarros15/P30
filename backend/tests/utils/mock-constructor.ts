// Mock constructor utility for Mongoose models
export const createMockConstructor = (mockData: any = {}) => {
  return jest.fn().mockImplementation((data) => ({
    ...data,
    save: jest.fn().mockResolvedValue({
      _id: '507f1f77bcf86cd799439011',
      ...data,
    }),
    ...mockData,
  }));
};

// Mock factory for User model
export const createMockUserConstructor = () => {
  const mockConstructor = createMockConstructor();
  
  return {
    findOne: jest.fn(),
    findById: jest.fn(),
    constructor: mockConstructor,
    save: jest.fn(),
  };
};

// Mock factory for Job model
export const createMockJobConstructor = () => {
  const mockConstructor = createMockConstructor();
  
  return {
    findOne: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
    countDocuments: jest.fn(),
    constructor: mockConstructor,
    save: jest.fn(),
  };
};

// Mock factory for Candidate model
export const createMockCandidateConstructor = () => {
  const mockConstructor = createMockConstructor();
  
  return {
    findOne: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
    countDocuments: jest.fn(),
    constructor: mockConstructor,
    save: jest.fn(),
  };
};