import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { CandidatesController } from '../../src/modules/candidates/candidates.controller';
import { CandidatesService } from '../../src/modules/candidates/candidates.service';
import { Candidate } from '../../src/modules/candidates/schemas/candidate.schema';
import { CreateCandidateDto } from '../../src/modules/candidates/dto/create-candidate.dto';
import { UpdateCandidateDto } from '../../src/modules/candidates/dto/update-candidate.dto';

describe('Candidates Integration Tests', () => {
  let app: INestApplication;
  let candidateModel: any;

  const mockCandidate = {
    _id: '507f1f77bcf86cd799439011',
    name: 'João Silva',
    email: 'joao@email.com',
    skills: ['javascript', 'node.js', 'react'],
    experienceYears: 3,
    isInvited: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeAll(async () => {
    const MockCandidateConstructor = jest.fn().mockImplementation((data) => ({
      ...data,
      _id: '507f1f77bcf86cd799439011',
      save: jest.fn().mockResolvedValue({
        _id: '507f1f77bcf86cd799439011',
        ...data,
      }),
    })) as any;

    MockCandidateConstructor.findOne = jest.fn();
    MockCandidateConstructor.findById = jest.fn();
    MockCandidateConstructor.find = jest.fn();
    MockCandidateConstructor.findByIdAndUpdate = jest.fn();
    MockCandidateConstructor.findByIdAndDelete = jest.fn();
    MockCandidateConstructor.countDocuments = jest.fn();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CandidatesController],
      providers: [
        CandidatesService,
        {
          provide: getModelToken(Candidate.name),
          useValue: MockCandidateConstructor,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    candidateModel = moduleFixture.get<any>(getModelToken(Candidate.name));
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /candidates', () => {
    it('should create a new candidate successfully', async () => {
      const validCreateDto: CreateCandidateDto = {
        name: 'João Silva',
        email: 'joao@email.com',
        skills: ['JavaScript', 'Node.js', 'React'],
        experienceYears: 3,
      };

      candidateModel.findOne.mockResolvedValue(null);

      const response = await request(app.getHttpServer())
        .post('/candidates')
        .send(validCreateDto)
        .expect(201);

      expect(response.body).toEqual({
        success: true,
        message: 'Candidato criado com sucesso',
        data: {
          _id: '507f1f77bcf86cd799439011',
          ...validCreateDto,
          skills: ['javascript', 'node.js', 'react'],
        },
      });
    });

    it('should return 409 when email already exists', async () => {
      const validCreateDto: CreateCandidateDto = {
        name: 'João Silva',
        email: 'joao@email.com',
        skills: ['JavaScript', 'Node.js'],
        experienceYears: 3,
      };

      candidateModel.findOne.mockResolvedValue(mockCandidate);

      await request(app.getHttpServer())
        .post('/candidates')
        .send(validCreateDto)
        .expect(409);
    });

    it('should return 400 for invalid data', async () => {
      const invalidCreateDto = {
        name: '',
        email: 'invalid-email',
        skills: [],
        experienceYears: -1,
      };

      await request(app.getHttpServer())
        .post('/candidates')
        .send(invalidCreateDto)
        .expect(400);
    });

    it('should validate required fields', async () => {
      const invalidCreateDto = {
        name: 'João Silva',
        // Missing email, skills, experienceYears
      };

      await request(app.getHttpServer())
        .post('/candidates')
        .send(invalidCreateDto)
        .expect(400);
    });
  });

  describe('GET /candidates', () => {
    it('should return paginated candidates', async () => {
      const mockCandidates = [mockCandidate];
      const mockCount = 1;

      candidateModel.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockCandidates),
      });
      candidateModel.countDocuments.mockResolvedValue(mockCount);

      const response = await request(app.getHttpServer())
        .get('/candidates')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: {
          candidates: mockCandidates,
          pagination: {
            page: 1,
            limit: 10,
            total: mockCount,
            totalPages: 1,
          },
        },
      });
    });

    it('should filter candidates by name', async () => {
      const mockCandidates = [mockCandidate];
      const mockCount = 1;

      candidateModel.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockCandidates),
      });
      candidateModel.countDocuments.mockResolvedValue(mockCount);

      await request(app.getHttpServer())
        .get('/candidates?name=João')
        .expect(200);

      expect(candidateModel.find).toHaveBeenCalledWith({
        name: { $regex: 'João', $options: 'i' },
      });
    });

    it('should filter candidates by skills', async () => {
      const mockCandidates = [mockCandidate];
      const mockCount = 1;

      candidateModel.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockCandidates),
      });
      candidateModel.countDocuments.mockResolvedValue(mockCount);

      await request(app.getHttpServer())
        .get('/candidates?skills=javascript,react')
        .expect(200);

      expect(candidateModel.find).toHaveBeenCalledWith({
        skills: { $in: ['javascript', 'react'] },
      });
    });
  });

  describe('GET /candidates/:id', () => {
    it('should return a candidate by id', async () => {
      const candidateId = '507f1f77bcf86cd799439011';

      candidateModel.findById.mockResolvedValue(mockCandidate);

      const response = await request(app.getHttpServer())
        .get(`/candidates/${candidateId}`)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: mockCandidate,
      });
    });

    it('should return 404 when candidate not found', async () => {
      const candidateId = '507f1f77bcf86cd799439011';

      candidateModel.findById.mockResolvedValue(null);

      await request(app.getHttpServer())
        .get(`/candidates/${candidateId}`)
        .expect(404);
    });

    it('should return 400 for invalid id', async () => {
      const invalidId = 'invalid-id';

      await request(app.getHttpServer())
        .get(`/candidates/${invalidId}`)
        .expect(400);
    });
  });

  describe('PATCH /candidates/:id', () => {
    it('should update a candidate successfully', async () => {
      const candidateId = '507f1f77bcf86cd799439011';
      const updateDto: UpdateCandidateDto = {
        name: 'João Silva Santos',
        skills: ['JavaScript', 'Node.js', 'React', 'TypeScript'],
      };

      const updatedCandidate = {
        ...mockCandidate,
        name: 'João Silva Santos',
        skills: ['javascript', 'node.js', 'react', 'typescript'],
      };

      candidateModel.findByIdAndUpdate.mockResolvedValue(updatedCandidate);

      const response = await request(app.getHttpServer())
        .patch(`/candidates/${candidateId}`)
        .send(updateDto)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        message: 'Candidato atualizado com sucesso',
        data: updatedCandidate,
      });
    });

    it('should return 404 when candidate not found', async () => {
      const candidateId = '507f1f77bcf86cd799439011';
      const updateDto: UpdateCandidateDto = {
        name: 'João Silva Santos',
      };

      candidateModel.findByIdAndUpdate.mockResolvedValue(null);

      await request(app.getHttpServer())
        .patch(`/candidates/${candidateId}`)
        .send(updateDto)
        .expect(404);
    });

    it('should return 400 for invalid id', async () => {
      const invalidId = 'invalid-id';
      const updateDto: UpdateCandidateDto = {
        name: 'João Silva Santos',
      };

      await request(app.getHttpServer())
        .patch(`/candidates/${invalidId}`)
        .send(updateDto)
        .expect(400);
    });
  });

  describe('DELETE /candidates/:id', () => {
    it('should delete a candidate successfully', async () => {
      const candidateId = '507f1f77bcf86cd799439011';

      candidateModel.findByIdAndDelete.mockResolvedValue(mockCandidate);

      const response = await request(app.getHttpServer())
        .delete(`/candidates/${candidateId}`)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        message: 'Candidato deletado com sucesso',
        data: { id: candidateId },
      });
    });

    it('should return 404 when candidate not found', async () => {
      const candidateId = '507f1f77bcf86cd799439011';

      candidateModel.findByIdAndDelete.mockResolvedValue(null);

      await request(app.getHttpServer())
        .delete(`/candidates/${candidateId}`)
        .expect(404);
    });

    it('should return 400 for invalid id', async () => {
      const invalidId = 'invalid-id';

      await request(app.getHttpServer())
        .delete(`/candidates/${invalidId}`)
        .expect(400);
    });
  });

  describe('POST /candidates/:id/invite', () => {
    it('should invite a candidate successfully', async () => {
      const candidateId = '507f1f77bcf86cd799439011';
      const invitedCandidate = {
        ...mockCandidate,
        isInvited: true,
      };

      candidateModel.findByIdAndUpdate.mockResolvedValue(invitedCandidate);

      const response = await request(app.getHttpServer())
        .post(`/candidates/${candidateId}/invite`)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        message: 'Candidato convidado com sucesso',
        data: invitedCandidate,
      });
    });

    it('should return 404 when candidate not found', async () => {
      const candidateId = '507f1f77bcf86cd799439011';

      candidateModel.findByIdAndUpdate.mockResolvedValue(null);

      await request(app.getHttpServer())
        .post(`/candidates/${candidateId}/invite`)
        .expect(404);
    });

    it('should return 400 for invalid id', async () => {
      const invalidId = 'invalid-id';

      await request(app.getHttpServer())
        .post(`/candidates/${invalidId}/invite`)
        .expect(400);
    });
  });

  describe('POST /candidates/:id/uninvite', () => {
    it('should uninvite a candidate successfully', async () => {
      const candidateId = '507f1f77bcf86cd799439011';
      const uninvitedCandidate = {
        ...mockCandidate,
        isInvited: false,
      };

      candidateModel.findByIdAndUpdate.mockResolvedValue(uninvitedCandidate);

      const response = await request(app.getHttpServer())
        .post(`/candidates/${candidateId}/uninvite`)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        message: 'Convite cancelado com sucesso',
        data: uninvitedCandidate,
      });
    });

    it('should return 404 when candidate not found', async () => {
      const candidateId = '507f1f77bcf86cd799439011';

      candidateModel.findByIdAndUpdate.mockResolvedValue(null);

      await request(app.getHttpServer())
        .post(`/candidates/${candidateId}/uninvite`)
        .expect(404);
    });

    it('should return 400 for invalid id', async () => {
      const invalidId = 'invalid-id';

      await request(app.getHttpServer())
        .post(`/candidates/${invalidId}/uninvite`)
        .expect(400);
    });
  });
});
