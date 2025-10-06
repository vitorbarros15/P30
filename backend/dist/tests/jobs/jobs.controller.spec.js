"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const jobs_controller_1 = require("../../src/modules/jobs/jobs.controller");
const jobs_service_1 = require("../../src/modules/jobs/jobs.service");
const business_exception_1 = require("../../src/shared/exceptions/business.exception");
describe('JobsController', () => {
    let controller;
    let jobsService;
    const mockJobsService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [jobs_controller_1.JobsController],
            providers: [
                {
                    provide: jobs_service_1.JobsService,
                    useValue: mockJobsService,
                },
            ],
        }).compile();
        controller = module.get(jobs_controller_1.JobsController);
        jobsService = module.get(jobs_service_1.JobsService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('create', () => {
        const createJobDto = {
            title: 'Desenvolvedor Full Stack',
            description: 'Desenvolver aplicações web completas',
            location: 'São Paulo, SP',
            salaryRange: 'R$ 5.000 - R$ 8.000',
            skills: ['JavaScript', 'React', 'Node.js'],
        };
        it('should create a new job successfully', async () => {
            const mockJob = {
                _id: '507f1f77bcf86cd799439011',
                ...createJobDto,
                createdAt: new Date(),
            };
            mockJobsService.create.mockResolvedValue(mockJob);
            const result = await controller.create(createJobDto);
            expect(result).toEqual({
                success: true,
                message: 'Vaga criada com sucesso',
                data: mockJob,
            });
            expect(jobsService.create).toHaveBeenCalledWith(createJobDto);
        });
        it('should handle validation errors', async () => {
            const invalidDto = {
                title: '',
                description: '',
                location: '',
                salaryRange: '',
                skills: [],
            };
            const validationError = new business_exception_1.ValidationException('Dados inválidos');
            mockJobsService.create.mockRejectedValue(validationError);
            await expect(controller.create(invalidDto)).rejects.toThrow(business_exception_1.ValidationException);
        });
    });
    describe('findAll', () => {
        const query = {
            page: 1,
            limit: 10,
        };
        it('should return paginated jobs', async () => {
            const mockResult = {
                jobs: [
                    {
                        _id: '507f1f77bcf86cd799439011',
                        title: 'Desenvolvedor Full Stack',
                        description: 'Desenvolver aplicações web completas',
                        location: 'São Paulo, SP',
                        salaryRange: 'R$ 5.000 - R$ 8.000',
                        skills: ['JavaScript', 'React', 'Node.js'],
                        createdAt: new Date(),
                    },
                ],
                pagination: {
                    page: 1,
                    limit: 10,
                    total: 1,
                    totalPages: 1,
                    hasNext: false,
                    hasPrev: false,
                },
            };
            mockJobsService.findAll.mockResolvedValue(mockResult);
            const result = await controller.findAll(query);
            expect(result).toEqual({
                success: true,
                data: mockResult,
            });
            expect(jobsService.findAll).toHaveBeenCalledWith(query);
        });
    });
    describe('findOne', () => {
        const jobId = '507f1f77bcf86cd799439011';
        it('should return a job by id', async () => {
            const mockJob = {
                _id: jobId,
                title: 'Desenvolvedor Full Stack',
                description: 'Desenvolver aplicações web completas',
                location: 'São Paulo, SP',
                salaryRange: 'R$ 5.000 - R$ 8.000',
                skills: ['JavaScript', 'React', 'Node.js'],
                createdAt: new Date(),
            };
            mockJobsService.findOne.mockResolvedValue(mockJob);
            const result = await controller.findOne(jobId);
            expect(result).toEqual({
                success: true,
                data: mockJob,
            });
            expect(jobsService.findOne).toHaveBeenCalledWith(jobId);
        });
        it('should throw NotFoundException when job not found', async () => {
            const notFoundError = new business_exception_1.NotFoundException('Vaga', jobId);
            mockJobsService.findOne.mockRejectedValue(notFoundError);
            await expect(controller.findOne(jobId)).rejects.toThrow(business_exception_1.NotFoundException);
        });
        it('should throw ValidationException for invalid id', async () => {
            const invalidId = 'invalid-id';
            const validationError = new business_exception_1.ValidationException('ID inválido', { field: 'id', value: invalidId });
            mockJobsService.findOne.mockRejectedValue(validationError);
            await expect(controller.findOne(invalidId)).rejects.toThrow(business_exception_1.ValidationException);
        });
    });
    describe('update', () => {
        const jobId = '507f1f77bcf86cd799439011';
        const updateJobDto = {
            title: 'Desenvolvedor Full Stack Senior',
        };
        it('should update a job successfully', async () => {
            const mockUpdatedJob = {
                _id: jobId,
                title: 'Desenvolvedor Full Stack Senior',
                description: 'Desenvolver aplicações web completas',
                location: 'São Paulo, SP',
                salaryRange: 'R$ 5.000 - R$ 8.000',
                skills: ['JavaScript', 'React', 'Node.js'],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockJobsService.update.mockResolvedValue(mockUpdatedJob);
            const result = await controller.update(jobId, updateJobDto);
            expect(result).toEqual({
                success: true,
                message: 'Vaga atualizada com sucesso',
                data: mockUpdatedJob,
            });
            expect(jobsService.update).toHaveBeenCalledWith(jobId, updateJobDto);
        });
        it('should throw NotFoundException when job not found', async () => {
            const notFoundError = new business_exception_1.NotFoundException('Vaga', jobId);
            mockJobsService.update.mockRejectedValue(notFoundError);
            await expect(controller.update(jobId, updateJobDto)).rejects.toThrow(business_exception_1.NotFoundException);
        });
    });
    describe('remove', () => {
        const jobId = '507f1f77bcf86cd799439011';
        it('should remove a job successfully', async () => {
            const mockResult = {
                id: jobId,
                message: 'Vaga removida com sucesso',
            };
            mockJobsService.remove.mockResolvedValue(mockResult);
            const result = await controller.remove(jobId);
            expect(result).toEqual({
                success: true,
                message: mockResult.message,
                data: { id: mockResult.id },
            });
            expect(jobsService.remove).toHaveBeenCalledWith(jobId);
        });
        it('should throw NotFoundException when job not found', async () => {
            const notFoundError = new business_exception_1.NotFoundException('Vaga', jobId);
            mockJobsService.remove.mockRejectedValue(notFoundError);
            await expect(controller.remove(jobId)).rejects.toThrow(business_exception_1.NotFoundException);
        });
    });
});
//# sourceMappingURL=jobs.controller.spec.js.map