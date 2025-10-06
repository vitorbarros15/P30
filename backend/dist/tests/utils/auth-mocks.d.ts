export declare const createMockUserModel: () => {
    findOne: jest.Mock<any, any, any>;
    findById: jest.Mock<any, any, any>;
    constructor: jest.Mock<any, any, any>;
    save: jest.Mock<any, any, any>;
};
export declare const createMockJwtService: () => {
    sign: jest.Mock<any, any, any>;
    verify: jest.Mock<any, any, any>;
};
export declare const createMockBcrypt: () => {
    hash: jest.Mock<any, any, any>;
    compare: jest.Mock<any, any, any>;
};
