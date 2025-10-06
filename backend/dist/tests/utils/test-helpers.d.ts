import { RegisterDto } from '../../src/modules/auth/dto/register.dto';
import { LoginDto } from '../../src/modules/auth/dto/login.dto';
import { CreateJobDto } from '../../src/modules/jobs/dto/create-job.dto';
import { UpdateJobDto } from '../../src/modules/jobs/dto/update-job.dto';
import { JobQueryDto } from '../../src/modules/jobs/dto/job-query.dto';
import { CreateCandidateDto } from '../../src/modules/candidates/dto/create-candidate.dto';
import { UpdateCandidateDto } from '../../src/modules/candidates/dto/update-candidate.dto';
import { CandidateQueryDto } from '../../src/modules/candidates/dto/candidate-query.dto';
export declare const createMockRegisterDto: (overrides?: Partial<RegisterDto>) => RegisterDto;
export declare const createMockLoginDto: (overrides?: Partial<LoginDto>) => LoginDto;
export declare const createMockCreateJobDto: (overrides?: Partial<CreateJobDto>) => CreateJobDto;
export declare const createMockUpdateJobDto: (overrides?: Partial<UpdateJobDto>) => UpdateJobDto;
export declare const createMockJobQueryDto: (overrides?: Partial<JobQueryDto>) => JobQueryDto;
export declare const createMockCreateCandidateDto: (overrides?: Partial<CreateCandidateDto>) => CreateCandidateDto;
export declare const createMockUpdateCandidateDto: (overrides?: Partial<UpdateCandidateDto>) => UpdateCandidateDto;
export declare const createMockCandidateQueryDto: (overrides?: Partial<CandidateQueryDto>) => CandidateQueryDto;
export declare const createMockUser: (overrides?: any) => any;
export declare const createMockJob: (overrides?: any) => any;
export declare const createMockCandidate: (overrides?: any) => any;
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
export declare const createMockJobResponse: (job: any) => {
    success: boolean;
    message: string;
    data: any;
};
export declare const createMockCandidateResponse: (candidate: any) => {
    success: boolean;
    message: string;
    data: any;
};
export declare const createMockPaginationResponse: (items: any[], pagination: any) => {
    success: boolean;
    data: {
        items: any[];
        pagination: any;
    };
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
export declare const createMockNotFoundError: (resource: string, id: string) => {
    message: string;
    statusCode: number;
};
export declare const createMockJwtPayload: (user: any) => {
    email: any;
    sub: any;
};
export declare const createMockPagination: (overrides?: any) => any;
