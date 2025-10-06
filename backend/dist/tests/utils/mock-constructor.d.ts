export declare const createMockConstructor: (mockData?: any) => jest.Mock<any, any, any>;
export declare const createMockUserConstructor: () => {
    findOne: jest.Mock<any, any, any>;
    findById: jest.Mock<any, any, any>;
    constructor: jest.Mock<any, any, any>;
    save: jest.Mock<any, any, any>;
};
export declare const createMockJobConstructor: () => {
    findOne: jest.Mock<any, any, any>;
    findById: jest.Mock<any, any, any>;
    find: jest.Mock<any, any, any>;
    countDocuments: jest.Mock<any, any, any>;
    constructor: jest.Mock<any, any, any>;
    save: jest.Mock<any, any, any>;
};
export declare const createMockCandidateConstructor: () => {
    findOne: jest.Mock<any, any, any>;
    findById: jest.Mock<any, any, any>;
    find: jest.Mock<any, any, any>;
    countDocuments: jest.Mock<any, any, any>;
    constructor: jest.Mock<any, any, any>;
    save: jest.Mock<any, any, any>;
};
