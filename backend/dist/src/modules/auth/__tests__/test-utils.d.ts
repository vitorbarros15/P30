import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
export declare const createMockUser: (overrides?: any) => any;
export declare const createMockRegisterDto: (overrides?: Partial<RegisterDto>) => RegisterDto;
export declare const createMockLoginDto: (overrides?: Partial<LoginDto>) => LoginDto;
export declare const createMockAuthResponse: (user: any, token?: string) => {
    success: boolean;
    message: string;
    data: {
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
        };
        token: string;
    };
};
export declare const createMockAdminUser: () => any;
export declare const createMockInactiveUser: () => any;
export declare const createMockJwtPayload: (user: any) => {
    email: any;
    sub: any;
};
export declare const createMockValidationError: (field: string, message: string) => {
    field: string;
    message: string;
    value: any;
};
export declare const createMockConflictError: (message: string, details?: any) => {
    message: string;
    details: any;
    statusCode: number;
};
export declare const createMockUnauthorizedError: (message?: string) => {
    message: string;
    statusCode: number;
};
