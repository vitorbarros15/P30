import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from '../../src/modules/jobs/jobs.controller';
import { JobsService } from '../../src/modules/jobs/jobs.service';
import { NotFoundException, ValidationException } from '../../src/shared/exceptions/business.exception';
import { CreateJobDto } from '../../src/modules/jobs/dto/create-job.dto';
import { UpdateJobDto } from '../../src/modules/jobs/dto/update-job.dto';
import { JobQueryDto } from '../../src/modules/jobs/dto/job-query.dto';

describe('JobsController', () => {
  let controller: JobsController;
  let jobsService: JobsService;

  const mockJobsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [
        {
          provide: JobsService,
          useValue: mockJobsService,
        },
      ],
    }).compile();

    controller = module.get<JobsController>(JobsController);
    jobsService = module.get<JobsService>(JobsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createJobDto: CreateJobDto = {
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
      } as CreateJobDto;

      const validationError = new ValidationException('Dados inválidos');
      mockJobsService.create.mockRejectedValue(validationError);

      await expect(controller.create(invalidDto)).rejects.toThrow(ValidationException);
    });
  });

  describe('findAll', () => {
    const query: JobQueryDto = {
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
      const notFoundError = new NotFoundException('Vaga', jobId);
      mockJobsService.findOne.mockRejectedValue(notFoundError);

      await expect(controller.findOne(jobId)).rejects.toThrow(NotFoundException);
    });

    it('should throw ValidationException for invalid id', async () => {
      const invalidId = 'invalid-id';
      const validationError = new ValidationException('ID inválido', { field: 'id', value: invalidId });
      mockJobsService.findOne.mockRejectedValue(validationError);

      await expect(controller.findOne(invalidId)).rejects.toThrow(ValidationException);
    });
  });

  describe('update', () => {
    const jobId = '507f1f77bcf86cd799439011';
    const updateJobDto: UpdateJobDto = {
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
      const notFoundError = new NotFoundException('Vaga', jobId);
      mockJobsService.update.mockRejectedValue(notFoundError);

      await expect(controller.update(jobId, updateJobDto)).rejects.toThrow(NotFoundException);
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
      const notFoundError = new NotFoundException('Vaga', jobId);
      mockJobsService.remove.mockRejectedValue(notFoundError);

      await expect(controller.remove(jobId)).rejects.toThrow(NotFoundException);
    });
  });
});
