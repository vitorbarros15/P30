"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const jobs_service_1 = require("../../src/modules/jobs/jobs.service");
const job_schema_1 = require("../../src/modules/jobs/schemas/job.schema");
const business_exception_1 = require("../../src/shared/exceptions/business.exception");
describe('JobsService', () => {
    let service;
    let jobModel;
    const mockJob = {
        _id: '507f1f77bcf86cd799439011',
        title: 'Desenvolvedor Full Stack',
        description: 'Desenvolver aplicações web completas usando React e Node.js',
        location: 'São Paulo, SP',
        salaryRange: 'R$ 8.000 - R$ 12.000',
        skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
        createdAt: new Date(),
        save: jest.fn(),
    };
    beforeEach(async () => {
        const MockJobConstructor = jest.fn().mockImplementation((data) => ({
            ...data,
            _id: '507f1f77bcf86cd799439011',
            createdAt: new Date(),
            save: jest.fn().mockResolvedValue({
                _id: '507f1f77bcf86cd799439011',
                ...data,
                createdAt: new Date(),
            }),
        }));
        MockJobConstructor.findOne = jest.fn();
        MockJobConstructor.findById = jest.fn();
        MockJobConstructor.findByIdAndUpdate = jest.fn();
        MockJobConstructor.findByIdAndDelete = jest.fn();
        MockJobConstructor.find = jest.fn();
        MockJobConstructor.countDocuments = jest.fn();
        const module = await testing_1.Test.createTestingModule({
            providers: [
                jobs_service_1.JobsService,
                {
                    provide: (0, mongoose_1.getModelToken)(job_schema_1.Job.name),
                    useValue: MockJobConstructor,
                },
            ],
        }).compile();
        service = module.get(jobs_service_1.JobsService);
        jobModel = module.get((0, mongoose_1.getModelToken)(job_schema_1.Job.name));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('create', () => {
        const createJobDto = {
            title: 'Desenvolvedor Full Stack',
            description: 'Desenvolver aplicações web completas usando React e Node.js',
            location: 'São Paulo, SP',
            salaryRange: 'R$ 8.000 - R$ 12.000',
            skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
        };
        it('should create a new job successfully', async () => {
            const result = await service.create(createJobDto);
            expect(jobModel).toHaveBeenCalledWith(createJobDto);
            expect(result).toEqual({
                _id: '507f1f77bcf86cd799439011',
                ...createJobDto,
                createdAt: expect.any(Date),
            });
        });
        it('should throw BadRequestException when creation fails', async () => {
            const mockError = new Error('Database connection failed');
            jobModel.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(mockError),
            }));
            await expect(service.create(createJobDto)).rejects.toThrow(common_1.BadRequestException);
            await expect(service.create(createJobDto)).rejects.toThrow('Erro ao criar vaga: Database connection failed');
        });
    });
    describe('findAll', () => {
        const query = {
            page: 1,
            limit: 10,
        };
        it('should return paginated jobs without search', async () => {
            const mockJobs = [mockJob];
            const mockTotal = 1;
            jobModel.find.mockReturnValue({
                sort: jest.fn().mockReturnValue({
                    skip: jest.fn().mockReturnValue({
                        limit: jest.fn().mockReturnValue({
                            lean: jest.fn().mockReturnValue({
                                exec: jest.fn().mockResolvedValue(mockJobs),
                            }),
                        }),
                    }),
                }),
            });
            jobModel.countDocuments.mockResolvedValue(mockTotal);
            const result = await service.findAll(query);
            expect(result).toEqual({
                jobs: mockJobs,
                pagination: {
                    page: 1,
                    limit: 10,
                    total: 1,
                    totalPages: 1,
                    hasNext: false,
                    hasPrev: false,
                },
            });
        });
        it('should return paginated jobs with search filter', async () => {
            const queryWithSearch = {
                page: 1,
                limit: 10,
                search: 'React',
            };
            const mockJobs = [mockJob];
            const mockTotal = 1;
            jobModel.find.mockReturnValue({
                sort: jest.fn().mockReturnValue({
                    skip: jest.fn().mockReturnValue({
                        limit: jest.fn().mockReturnValue({
                            lean: jest.fn().mockReturnValue({
                                exec: jest.fn().mockResolvedValue(mockJobs),
                            }),
                        }),
                    }),
                }),
            });
            jobModel.countDocuments.mockResolvedValue(mockTotal);
            const result = await service.findAll(queryWithSearch);
            expect(jobModel.find).toHaveBeenCalledWith({
                $or: [
                    { title: { $regex: 'React', $options: 'i' } },
                    { description: { $regex: 'React', $options: 'i' } },
                    { location: { $regex: 'React', $options: 'i' } },
                    { skills: { $in: [new RegExp('React', 'i')] } },
                ],
            });
            expect(result).toEqual({
                jobs: mockJobs,
                pagination: {
                    page: 1,
                    limit: 10,
                    total: 1,
                    totalPages: 1,
                    hasNext: false,
                    hasPrev: false,
                },
            });
        });
        it('should handle pagination correctly', async () => {
            const query = {
                page: 2,
                limit: 5,
            };
            const mockJobs = [mockJob];
            const mockTotal = 12;
            jobModel.find.mockReturnValue({
                sort: jest.fn().mockReturnValue({
                    skip: jest.fn().mockReturnValue({
                        limit: jest.fn().mockReturnValue({
                            lean: jest.fn().mockReturnValue({
                                exec: jest.fn().mockResolvedValue(mockJobs),
                            }),
                        }),
                    }),
                }),
            });
            jobModel.countDocuments.mockResolvedValue(mockTotal);
            const result = await service.findAll(query);
            expect(result.pagination).toEqual({
                page: 2,
                limit: 5,
                total: 12,
                totalPages: 3,
                hasNext: true,
                hasPrev: true,
            });
        });
    });
    describe('findOne', () => {
        const validId = '507f1f77bcf86cd799439011';
        it('should return a job by valid id', async () => {
            jobModel.findById.mockReturnValue({
                lean: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue(mockJob),
                }),
            });
            const result = await service.findOne(validId);
            expect(jobModel.findById).toHaveBeenCalledWith(validId);
            expect(result).toEqual(mockJob);
        });
        it('should throw ValidationException for invalid id', async () => {
            const invalidId = 'invalid-id';
            await expect(service.findOne(invalidId)).rejects.toThrow(business_exception_1.ValidationException);
            await expect(service.findOne(invalidId)).rejects.toThrow('ID inválido');
        });
        it('should throw NotFoundException when job not found', async () => {
            jobModel.findById.mockReturnValue({
                lean: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue(null),
                }),
            });
            await expect(service.findOne(validId)).rejects.toThrow(business_exception_1.NotFoundException);
            await expect(service.findOne(validId)).rejects.toThrow('Vaga');
        });
    });
    describe('update', () => {
        const validId = '507f1f77bcf86cd799439011';
        const updateJobDto = {
            title: 'Desenvolvedor Full Stack Senior',
        };
        it('should update a job successfully', async () => {
            const updatedJob = {
                ...mockJob,
                ...updateJobDto,
            };
            jobModel.findByIdAndUpdate.mockReturnValue({
                lean: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue(updatedJob),
                }),
            });
            const result = await service.update(validId, updateJobDto);
            expect(jobModel.findByIdAndUpdate).toHaveBeenCalledWith(validId, updateJobDto, { new: true, runValidators: true });
            expect(result).toEqual(updatedJob);
        });
        it('should throw BadRequestException for invalid id', async () => {
            const invalidId = 'invalid-id';
            await expect(service.update(invalidId, updateJobDto)).rejects.toThrow(common_1.BadRequestException);
            await expect(service.update(invalidId, updateJobDto)).rejects.toThrow('ID inválido');
        });
        it('should throw NotFoundException when job not found', async () => {
            jobModel.findByIdAndUpdate.mockReturnValue({
                lean: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue(null),
                }),
            });
            await expect(service.update(validId, updateJobDto)).rejects.toThrow(business_exception_1.NotFoundException);
            await expect(service.update(validId, updateJobDto)).rejects.toThrow('Vaga não encontrada');
        });
    });
    describe('remove', () => {
        const validId = '507f1f77bcf86cd799439011';
        it('should remove a job successfully', async () => {
            jobModel.findByIdAndDelete.mockReturnValue({
                lean: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue(mockJob),
                }),
            });
            const result = await service.remove(validId);
            expect(jobModel.findByIdAndDelete).toHaveBeenCalledWith(validId);
            expect(result).toEqual({
                id: validId,
                message: 'Vaga deletada com sucesso',
            });
        });
        it('should throw BadRequestException for invalid id', async () => {
            const invalidId = 'invalid-id';
            await expect(service.remove(invalidId)).rejects.toThrow(common_1.BadRequestException);
            await expect(service.remove(invalidId)).rejects.toThrow('ID inválido');
        });
        it('should throw NotFoundException when job not found', async () => {
            jobModel.findByIdAndDelete.mockReturnValue({
                lean: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue(null),
                }),
            });
            await expect(service.remove(validId)).rejects.toThrow(business_exception_1.NotFoundException);
            await expect(service.remove(validId)).rejects.toThrow('Vaga não encontrada');
        });
    });
    describe('isValidObjectId', () => {
        it('should validate correct ObjectId format', () => {
            const validIds = [
                '507f1f77bcf86cd799439011',
                '507f1f77bcf86cd799439012',
                '000000000000000000000000',
                'ffffffffffffffffffffffff',
            ];
            validIds.forEach(id => {
                expect(service.isValidObjectId(id)).toBe(true);
            });
        });
        it('should reject invalid ObjectId format', () => {
            const invalidIds = [
                'invalid-id',
                '507f1f77bcf86cd79943901',
                '507f1f77bcf86cd7994390111',
                '507f1f77bcf86cd79943901g',
                '',
                null,
                undefined,
            ];
            invalidIds.forEach(id => {
                expect(service.isValidObjectId(id)).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=jobs.service.spec.js.map