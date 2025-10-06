// Mock factory for Candidate model
export const createMockCandidateModel = () => {
  const MockCandidateConstructor = jest.fn().mockImplementation((data) => ({
    ...data,
    _id: '507f1f77bcf86cd799439011',
    save: jest.fn().mockResolvedValue({
      _id: '507f1f77bcf86cd799439011',
      ...data,
    }),
  })) as any;

  // Mock methods
  MockCandidateConstructor.findOne = jest.fn();
  MockCandidateConstructor.findById = jest.fn();
  MockCandidateConstructor.find = jest.fn();
  MockCandidateConstructor.findByIdAndUpdate = jest.fn();
  MockCandidateConstructor.findByIdAndDelete = jest.fn();
  MockCandidateConstructor.countDocuments = jest.fn();

  // Mock findByIdAndUpdate with lean method
  MockCandidateConstructor.findByIdAndUpdate.mockReturnValue({
    lean: jest.fn().mockResolvedValue({}),
  });

  // Mock find method with chained methods
  const mockQuery = {
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([]),
  };
  MockCandidateConstructor.find.mockReturnValue(mockQuery);

  return MockCandidateConstructor;
};

// Mock data for tests
export const mockCandidate = {
  _id: '507f1f77bcf86cd799439011',
  name: 'João Silva',
  email: 'joao@email.com',
  skills: ['javascript', 'node.js', 'react'],
  experienceYears: 3,
  isInvited: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockCandidates = [mockCandidate];

export const mockPagination = {
  page: 1,
  limit: 10,
  total: 1,
  totalPages: 1,
};
