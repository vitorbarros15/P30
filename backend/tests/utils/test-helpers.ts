import { RegisterDto } from '../../src/modules/auth/dto/register.dto';
import { LoginDto } from '../../src/modules/auth/dto/login.dto';
import { CreateJobDto } from '../../src/modules/jobs/dto/create-job.dto';
import { UpdateJobDto } from '../../src/modules/jobs/dto/update-job.dto';
import { JobQueryDto } from '../../src/modules/jobs/dto/job-query.dto';
import { CreateCandidateDto } from '../../src/modules/candidates/dto/create-candidate.dto';
import { UpdateCandidateDto } from '../../src/modules/candidates/dto/update-candidate.dto';
import { CandidateQueryDto } from '../../src/modules/candidates/dto/candidate-query.dto';

// Auth DTOs
export const createMockRegisterDto = (overrides: Partial<RegisterDto> = {}): RegisterDto => ({
  name: 'João Silva',
  email: 'joao@email.com',
  password: '123456',
  ...overrides,
});

export const createMockLoginDto = (overrides: Partial<LoginDto> = {}): LoginDto => ({
  email: 'joao@email.com',
  password: '123456',
  ...overrides,
});

// Job DTOs
export const createMockCreateJobDto = (overrides: Partial<CreateJobDto> = {}): CreateJobDto => ({
  title: 'Desenvolvedor Full Stack',
  description: 'Desenvolver aplicações web completas',
  location: 'São Paulo, SP',
  salaryRange: 'R$ 5.000 - R$ 8.000',
  skills: ['JavaScript', 'React', 'Node.js'],
  ...overrides,
});

export const createMockUpdateJobDto = (overrides: Partial<UpdateJobDto> = {}): UpdateJobDto => ({
  title: 'Desenvolvedor Full Stack Senior',
  ...overrides,
});

export const createMockJobQueryDto = (overrides: Partial<JobQueryDto> = {}): JobQueryDto => ({
  page: 1,
  limit: 10,
  ...overrides,
});

// Candidate DTOs
export const createMockCreateCandidateDto = (overrides: Partial<CreateCandidateDto> = {}): CreateCandidateDto => ({
  name: 'João Silva',
  email: 'joao@email.com',
  skills: ['JavaScript', 'React', 'Node.js'],
  experienceYears: 3,
  ...overrides,
});

export const createMockUpdateCandidateDto = (overrides: Partial<UpdateCandidateDto> = {}): UpdateCandidateDto => ({
  name: 'João Silva Santos',
  ...overrides,
});

export const createMockCandidateQueryDto = (overrides: Partial<CandidateQueryDto> = {}): CandidateQueryDto => ({
  page: 1,
  limit: 10,
  ...overrides,
});

// Mock Entities
export const createMockUser = (overrides: any = {}) => ({
  _id: '507f1f77bcf86cd799439011',
  email: 'joao@email.com',
  name: 'João Silva',
  password: 'hashed-password',
  role: 'user',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createMockJob = (overrides: any = {}) => ({
  _id: '507f1f77bcf86cd799439011',
  title: 'Desenvolvedor Full Stack',
  description: 'Desenvolver aplicações web completas',
  location: 'São Paulo, SP',
  salaryRange: 'R$ 5.000 - R$ 8.000',
  skills: ['javascript', 'react', 'node.js'],
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createMockCandidate = (overrides: any = {}) => ({
  _id: '507f1f77bcf86cd799439011',
  name: 'João Silva',
  email: 'joao@email.com',
  skills: ['javascript', 'react', 'node.js'],
  experienceYears: 3,
  isInvited: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

// Mock Responses
export const createMockAuthResponse = (user: any, token: string = 'jwt-token') => ({
  success: true,
  message: 'Operation successful',
  data: {
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  },
});

export const createMockJobResponse = (job: any) => ({
  success: true,
  message: 'Job operation successful',
  data: job,
});

export const createMockCandidateResponse = (candidate: any) => ({
  success: true,
  message: 'Candidate operation successful',
  data: candidate,
});

export const createMockPaginationResponse = (items: any[], pagination: any) => ({
  success: true,
  data: {
    items,
    pagination,
  },
});

// Mock Errors
export const createMockValidationError = (field: string, message: string) => ({
  field,
  message,
  value: null,
});

export const createMockConflictError = (message: string, details?: any) => ({
  message,
  details,
  statusCode: 409,
});

export const createMockUnauthorizedError = (message: string = 'Credenciais inválidas') => ({
  message,
  statusCode: 401,
});

export const createMockNotFoundError = (resource: string, id: string) => ({
  message: `${resource} com ID ${id} não encontrado`,
  statusCode: 404,
});

// Mock JWT
export const createMockJwtPayload = (user: any) => ({
  email: user.email,
  sub: user._id,
});

// Mock Pagination
export const createMockPagination = (overrides: any = {}) => ({
  page: 1,
  limit: 10,
  total: 1,
  totalPages: 1,
  hasNext: false,
  hasPrev: false,
  ...overrides,
});
