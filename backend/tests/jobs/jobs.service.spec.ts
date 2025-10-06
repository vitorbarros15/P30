import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { JobsService } from '../../src/modules/jobs/jobs.service';
import { Job } from '../../src/modules/jobs/schemas/job.schema';
import { CreateJobDto } from '../../src/modules/jobs/dto/create-job.dto';
import { UpdateJobDto } from '../../src/modules/jobs/dto/update-job.dto';
import { JobQueryDto } from '../../src/modules/jobs/dto/job-query.dto';
import { NotFoundException, ValidationException } from '../../src/shared/exceptions/business.exception';

describe('JobsService', () => {
  let service: JobsService;
  let jobModel: any;

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
    
    // Create a proper mock constructor that can be called with 'new'
    const MockJobConstructor = jest.fn().mockImplementation((data) => ({
      ...data,
      _id: '507f1f77bcf86cd799439011',
      createdAt: new Date(),
      save: jest.fn().mockResolvedValue({
        _id: '507f1f77bcf86cd799439011',
        ...data,
        createdAt: new Date(),
      }),
    })) as any;

    // Add static methods to the constructor
    MockJobConstructor.findOne = jest.fn();
    MockJobConstructor.findById = jest.fn();
    MockJobConstructor.findByIdAndUpdate = jest.fn();
    MockJobConstructor.findByIdAndDelete = jest.fn();
    MockJobConstructor.find = jest.fn();
    MockJobConstructor.countDocuments = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: getModelToken(Job.name),
          useValue: MockJobConstructor,
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
    jobModel = module.get<any>(getModelToken(Job.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createJobDto: CreateJobDto = {
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

      await expect(service.create(createJobDto)).rejects.toThrow(BadRequestException);
      await expect(service.create(createJobDto)).rejects.toThrow('Erro ao criar vaga: Database connection failed');
    });
  });

  describe('findAll', () => {
    const query: JobQueryDto = {
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
      const queryWithSearch: JobQueryDto = {
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
      const query: JobQueryDto = {
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

      await expect(service.findOne(invalidId)).rejects.toThrow(ValidationException);
      await expect(service.findOne(invalidId)).rejects.toThrow('ID inválido');
    });

    it('should throw NotFoundException when job not found', async () => {
      jobModel.findById.mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      await expect(service.findOne(validId)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(validId)).rejects.toThrow('Vaga');
    });
  });

  describe('update', () => {
    const validId = '507f1f77bcf86cd799439011';
    const updateJobDto: UpdateJobDto = {
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

      expect(jobModel.findByIdAndUpdate).toHaveBeenCalledWith(
        validId,
        updateJobDto,
        { new: true, runValidators: true }
      );
      expect(result).toEqual(updatedJob);
    });

    it('should throw BadRequestException for invalid id', async () => {
      const invalidId = 'invalid-id';

      await expect(service.update(invalidId, updateJobDto)).rejects.toThrow(BadRequestException);
      await expect(service.update(invalidId, updateJobDto)).rejects.toThrow('ID inválido');
    });

    it('should throw NotFoundException when job not found', async () => {
      jobModel.findByIdAndUpdate.mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      await expect(service.update(validId, updateJobDto)).rejects.toThrow(NotFoundException);
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

      await expect(service.remove(invalidId)).rejects.toThrow(BadRequestException);
      await expect(service.remove(invalidId)).rejects.toThrow('ID inválido');
    });

    it('should throw NotFoundException when job not found', async () => {
      jobModel.findByIdAndDelete.mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      await expect(service.remove(validId)).rejects.toThrow(NotFoundException);
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
        expect((service as any).isValidObjectId(id)).toBe(true);
      });
    });

    it('should reject invalid ObjectId format', () => {
      const invalidIds = [
        'invalid-id',
        '507f1f77bcf86cd79943901', // too short
        '507f1f77bcf86cd7994390111', // too long
        '507f1f77bcf86cd79943901g', // invalid character
        '',
        null,
        undefined,
      ];

      invalidIds.forEach(id => {
        expect((service as any).isValidObjectId(id)).toBe(false);
      });
    });
  });
});
