import { TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
export declare const createTestModule: (controllers: any[], providers: any[]) => Promise<TestingModule>;
export declare const createMockModelProvider: (modelName: string, mockModel: any) => {
    provide: string;
    useValue: any;
};
export declare const createMockJwtProvider: (mockJwt: any) => {
    provide: typeof JwtService;
    useValue: any;
};
export declare const setupTestEnvironment: () => void;
