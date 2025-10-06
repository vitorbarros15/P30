import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { JobsController } from '../../src/modules/jobs/jobs.controller';
import { JobsService } from '../../src/modules/jobs/jobs.service';
import { Job } from '../../src/modules/jobs/schemas/job.schema';
import { CreateJobDto } from '../../src/modules/jobs/dto/create-job.dto';
import { UpdateJobDto } from '../../src/modules/jobs/dto/update-job.dto';

describe('Jobs Integration Tests', () => {
  let app: INestApplication;
  let jobModel: any;

  beforeAll(async () => {
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

    MockJobConstructor.findOne = jest.fn();
    MockJobConstructor.findById = jest.fn();
    MockJobConstructor.findByIdAndUpdate = jest.fn();
    MockJobConstructor.findByIdAndDelete = jest.fn();
    MockJobConstructor.find = jest.fn();
    MockJobConstructor.countDocuments = jest.fn();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [
        JobsService,
        {
          provide: getModelToken(Job.name),
          useValue: MockJobConstructor,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    jobModel = moduleFixture.get<any>(getModelToken(Job.name));
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /jobs', () => {
    const validCreateJobDto: CreateJobDto = {
      title: 'Desenvolvedor Full Stack',
      description: 'Desenvolver aplicações web completas usando React e Node.js para projetos inovadores',
      location: 'São Paulo, SP',
      salaryRange: 'R$ 8.000 - R$ 12.000',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    };

    it('should create a new job successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/jobs')
        .send(validCreateJobDto)
        .expect(201);

      expect(response.body).toEqual({
        success: true,
        message: 'Vaga criada com sucesso',
        data: {
          _id: '507f1f77bcf86cd799439011',
          ...validCreateJobDto,
          createdAt: expect.any(String),
        },
      });
    });

    it('should return 400 for invalid data', async () => {
      const invalidDto = {
        title: '',
        description: 'Short',
        location: '',
        salaryRange: '',
        skills: [],
      };

      await request(app.getHttpServer())
        .post('/jobs')
        .send(invalidDto)
        .expect(400);
    });

    it('should validate required fields', async () => {
      const incompleteDto = {
        title: 'Desenvolvedor',
      };

      await request(app.getHttpServer())
        .post('/jobs')
        .send(incompleteDto)
        .expect(400);
    });

    it('should validate title length', async () => {
      const invalidDto = {
        ...validCreateJobDto,
        title: 'a'.repeat(101),
      };

      await request(app.getHttpServer())
        .post('/jobs')
        .send(invalidDto)
        .expect(400);
    });

    it('should validate description length', async () => {
      const invalidDto = {
        ...validCreateJobDto,
        description: 'Short',
      };

      await request(app.getHttpServer())
        .post('/jobs')
        .send(invalidDto)
        .expect(400);
    });

    it('should validate skills array', async () => {
      const invalidDto = {
        ...validCreateJobDto,
        skills: [],
      };

      await request(app.getHttpServer())
        .post('/jobs')
        .send(invalidDto)
        .expect(400);
    });
  });

  describe('GET /jobs', () => {
    it('should return paginated jobs', async () => {
      const mockJobs = [
        {
          _id: '507f1f77bcf86cd799439011',
          title: 'Desenvolvedor Full Stack',
          description: 'Desenvolver aplicações web completas',
          location: 'São Paulo, SP',
          salaryRange: 'R$ 8.000 - R$ 12.000',
          skills: ['React', 'Node.js'],
          createdAt: new Date(),
        },
      ];
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

      const response = await request(app.getHttpServer())
        .get('/jobs')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: {
          jobs: expect.arrayContaining([
            expect.objectContaining({
              _id: '507f1f77bcf86cd799439011',
              title: 'Desenvolvedor Full Stack',
            }),
          ]),
          pagination: {
            page: 1,
            limit: 10,
            total: 1,
            totalPages: 1,
            hasNext: false,
            hasPrev: false,
          },
        },
      });
    });

    it('should handle search query', async () => {
      const mockJobs = [];
      const mockTotal = 0;

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

      await request(app.getHttpServer())
        .get('/jobs?search=React')
        .expect(200);
    });

    it('should handle pagination parameters', async () => {
      const mockJobs = [];
      const mockTotal = 0;

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

      await request(app.getHttpServer())
        .get('/jobs?page=2&limit=5')
        .expect(200);
    });

    it('should validate pagination parameters', async () => {
      await request(app.getHttpServer())
        .get('/jobs?page=0')
        .expect(400);

      await request(app.getHttpServer())
        .get('/jobs?limit=0')
        .expect(400);

      await request(app.getHttpServer())
        .get('/jobs?limit=101')
        .expect(400);
    });
  });

  describe('GET /jobs/:id', () => {
    const validId = '507f1f77bcf86cd799439011';
    const mockJob = {
      _id: validId,
      title: 'Desenvolvedor Full Stack',
      description: 'Desenvolver aplicações web completas',
      location: 'São Paulo, SP',
      salaryRange: 'R$ 8.000 - R$ 12.000',
      skills: ['React', 'Node.js'],
      createdAt: new Date(),
    };

    it('should return a job by id', async () => {
      jobModel.findById.mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockJob),
        }),
      });

      const response = await request(app.getHttpServer())
        .get(`/jobs/${validId}`)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: {
          ...mockJob,
          createdAt: expect.any(String),
        },
      });
    });

    it('should return 400 for invalid id format', async () => {
      await request(app.getHttpServer())
        .get('/jobs/invalid-id')
        .expect(400);
    });

    it('should return 404 when job not found', async () => {
      jobModel.findById.mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      await request(app.getHttpServer())
        .get(`/jobs/${validId}`)
        .expect(404);
    });
  });

  describe('PATCH /jobs/:id', () => {
    const validId = '507f1f77bcf86cd799439011';
    const updateJobDto: UpdateJobDto = {
      title: 'Desenvolvedor Full Stack Senior',
    };

    it('should update a job successfully', async () => {
      const updatedJob = {
        _id: validId,
        title: 'Desenvolvedor Full Stack Senior',
        description: 'Desenvolver aplicações web completas',
        location: 'São Paulo, SP',
        salaryRange: 'R$ 8.000 - R$ 12.000',
        skills: ['React', 'Node.js'],
        createdAt: new Date(),
      };

      jobModel.findByIdAndUpdate.mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(updatedJob),
        }),
      });

      const response = await request(app.getHttpServer())
        .patch(`/jobs/${validId}`)
        .send(updateJobDto)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        message: 'Vaga atualizada com sucesso',
        data: {
          ...updatedJob,
          createdAt: expect.any(String),
        },
      });
    });

    it('should return 400 for invalid id format', async () => {
      await request(app.getHttpServer())
        .patch('/jobs/invalid-id')
        .send(updateJobDto)
        .expect(400);
    });

    it('should return 404 when job not found', async () => {
      jobModel.findByIdAndUpdate.mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      await request(app.getHttpServer())
        .patch(`/jobs/${validId}`)
        .send(updateJobDto)
        .expect(404);
    });

    it('should validate update data', async () => {
      const invalidDto = {
        title: 'a'.repeat(101), 
      };

      await request(app.getHttpServer())
        .patch(`/jobs/${validId}`)
        .send(invalidDto)
        .expect(400);
    });
  });

  describe('DELETE /jobs/:id', () => {
    const validId = '507f1f77bcf86cd799439011';
    const mockJob = {
      _id: validId,
      title: 'Desenvolvedor Full Stack',
      description: 'Desenvolver aplicações web completas',
      location: 'São Paulo, SP',
      salaryRange: 'R$ 8.000 - R$ 12.000',
      skills: ['React', 'Node.js'],
      createdAt: new Date(),
    };

    it('should delete a job successfully', async () => {
      jobModel.findByIdAndDelete.mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockJob),
        }),
      });

      const response = await request(app.getHttpServer())
        .delete(`/jobs/${validId}`)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        message: 'Vaga deletada com sucesso',
        data: { id: validId },
      });
    });

    it('should return 400 for invalid id format', async () => {
      await request(app.getHttpServer())
        .delete('/jobs/invalid-id')
        .expect(400);
    });

    it('should return 404 when job not found', async () => {
      jobModel.findByIdAndDelete.mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      await request(app.getHttpServer())
        .delete(`/jobs/${validId}`)
        .expect(404);
    });
  });

  describe('Validation Tests', () => {
    it('should validate job data format', async () => {
      const invalidDto = {
        title: 'a'.repeat(101), 
        description: 'Descrição muito longa para testar validação de tamanho mínimo',
        location: 'São Paulo',
        salaryRange: 'R$ 5.000 - R$ 8.000',
        skills: ['React'],
      };

      await request(app.getHttpServer())
        .post('/jobs')
        .send(invalidDto)
        .expect(400);
    });

    it('should validate skills array constraints', async () => {
      const invalidDto = {
        title: 'Desenvolvedor',
        description: 'Descrição muito longa para testar validação de tamanho mínimo',
        location: 'São Paulo',
        salaryRange: 'R$ 5.000 - R$ 8.000',
        skills: Array(21).fill('skill'), 
      };

      await request(app.getHttpServer())
        .post('/jobs')
        .send(invalidDto)
        .expect(400);
    });

    it('should validate salary range length', async () => {
      const invalidDto = {
        title: 'Desenvolvedor',
        description: 'Descrição muito longa para testar validação de tamanho mínimo',
        location: 'São Paulo',
        salaryRange: 'a'.repeat(51), 
        skills: ['React'],
      };

      await request(app.getHttpServer())
        .post('/jobs')
        .send(invalidDto)
        .expect(400);
    });
  });
});
