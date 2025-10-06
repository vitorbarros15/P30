import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesController } from '../../src/modules/candidates/candidates.controller';
import { CandidatesService } from '../../src/modules/candidates/candidates.service';
import { CreateCandidateDto } from '../../src/modules/candidates/dto/create-candidate.dto';
import { UpdateCandidateDto } from '../../src/modules/candidates/dto/update-candidate.dto';
import { CandidateQueryDto } from '../../src/modules/candidates/dto/candidate-query.dto';
import { NotFoundException, ValidationException, ConflictException } from '../../src/shared/exceptions/business.exception';

describe('CandidatesController', () => {
  let controller: CandidatesController;
  let service: CandidatesService;

  const mockCandidatesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    inviteCandidate: jest.fn(),
    uninviteCandidate: jest.fn(),
  };

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidatesController],
      providers: [
        {
          provide: CandidatesService,
          useValue: mockCandidatesService,
        },
      ],
    }).compile();

    controller = module.get<CandidatesController>(CandidatesController);
    service = module.get<CandidatesService>(CandidatesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new candidate successfully', async () => {
      const createCandidateDto: CreateCandidateDto = {
        name: 'João Silva',
        email: 'joao@email.com',
        skills: ['JavaScript', 'Node.js', 'React'],
        experienceYears: 3,
      };

      mockCandidatesService.create.mockResolvedValue(mockCandidate);

      const result = await controller.create(createCandidateDto);

      expect(service.create).toHaveBeenCalledWith(createCandidateDto);
      expect(result).toEqual({
        success: true,
        message: 'Candidato criado com sucesso',
        data: mockCandidate,
      });
    });

    it('should throw ConflictException when email already exists', async () => {
      const createCandidateDto: CreateCandidateDto = {
        name: 'João Silva',
        email: 'joao@email.com',
        skills: ['JavaScript', 'Node.js'],
        experienceYears: 3,
      };

      const conflictError = new ConflictException('Email já está em uso', {
        email: createCandidateDto.email,
      });

      mockCandidatesService.create.mockRejectedValue(conflictError);

      await expect(controller.create(createCandidateDto)).rejects.toThrow(ConflictException);
      expect(service.create).toHaveBeenCalledWith(createCandidateDto);
    });
  });

  describe('findAll', () => {
    it('should return paginated candidates', async () => {
      const query: CandidateQueryDto = {
        page: 1,
        limit: 10,
        name: 'João',
      };

      const mockResult = {
        candidates: [mockCandidate],
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      };

      mockCandidatesService.findAll.mockResolvedValue(mockResult);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual({
        success: true,
        data: mockResult,
      });
    });
  });

  describe('findOne', () => {
    it('should return a candidate by id', async () => {
      const candidateId = '507f1f77bcf86cd799439011';

      mockCandidatesService.findOne.mockResolvedValue(mockCandidate);

      const result = await controller.findOne(candidateId);

      expect(service.findOne).toHaveBeenCalledWith(candidateId);
      expect(result).toEqual({
        success: true,
        data: mockCandidate,
      });
    });

    it('should throw NotFoundException when candidate not found', async () => {
      const candidateId = '507f1f77bcf86cd799439011';
      const notFoundError = new NotFoundException('Candidato', candidateId);

      mockCandidatesService.findOne.mockRejectedValue(notFoundError);

      await expect(controller.findOne(candidateId)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(candidateId);
    });

    it('should throw ValidationException for invalid id', async () => {
      const invalidId = 'invalid-id';
      const validationError = new ValidationException('ID inválido', {
        id: invalidId,
      });

      mockCandidatesService.findOne.mockRejectedValue(validationError);

      await expect(controller.findOne(invalidId)).rejects.toThrow(ValidationException);
      expect(service.findOne).toHaveBeenCalledWith(invalidId);
    });
  });

  describe('update', () => {
    it('should update a candidate successfully', async () => {
      const candidateId = '507f1f77bcf86cd799439011';
      const updateCandidateDto: UpdateCandidateDto = {
        name: 'João Silva Santos',
        skills: ['JavaScript', 'Node.js', 'React', 'TypeScript'],
      };

      const updatedCandidate = {
        ...mockCandidate,
        name: 'João Silva Santos',
        skills: ['javascript', 'node.js', 'react', 'typescript'],
      };

      mockCandidatesService.update.mockResolvedValue(updatedCandidate);

      const result = await controller.update(candidateId, updateCandidateDto);

      expect(service.update).toHaveBeenCalledWith(candidateId, updateCandidateDto);
      expect(result).toEqual({
        success: true,
        message: 'Candidato atualizado com sucesso',
        data: updatedCandidate,
      });
    });

    it('should throw NotFoundException when candidate not found', async () => {
      const candidateId = '507f1f77bcf86cd799439011';
      const updateCandidateDto: UpdateCandidateDto = {
        name: 'João Silva Santos',
      };

      const notFoundError = new NotFoundException('Candidato', candidateId);

      mockCandidatesService.update.mockRejectedValue(notFoundError);

      await expect(controller.update(candidateId, updateCandidateDto)).rejects.toThrow(NotFoundException);
      expect(service.update).toHaveBeenCalledWith(candidateId, updateCandidateDto);
    });
  });

  describe('remove', () => {
    it('should remove a candidate successfully', async () => {
      const candidateId = '507f1f77bcf86cd799439011';
      const mockResult = {
        id: candidateId,
        message: 'Candidato deletado com sucesso',
      };

      mockCandidatesService.remove.mockResolvedValue(mockResult);

      const result = await controller.remove(candidateId);

      expect(service.remove).toHaveBeenCalledWith(candidateId);
      expect(result).toEqual({
        success: true,
        message: mockResult.message,
        data: { id: mockResult.id },
      });
    });

    it('should throw NotFoundException when candidate not found', async () => {
      const candidateId = '507f1f77bcf86cd799439011';
      const notFoundError = new NotFoundException('Candidato', candidateId);

      mockCandidatesService.remove.mockRejectedValue(notFoundError);

      await expect(controller.remove(candidateId)).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledWith(candidateId);
    });
  });

  describe('invite', () => {
    it('should invite a candidate successfully', async () => {
      const candidateId = '507f1f77bcf86cd799439011';
      const invitedCandidate = {
        ...mockCandidate,
        isInvited: true,
      };

      mockCandidatesService.inviteCandidate.mockResolvedValue(invitedCandidate);

      const result = await controller.invite(candidateId);

      expect(service.inviteCandidate).toHaveBeenCalledWith(candidateId);
      expect(result).toEqual({
        success: true,
        message: 'Candidato convidado com sucesso',
        data: invitedCandidate,
      });
    });

    it('should throw NotFoundException when candidate not found', async () => {
      const candidateId = '507f1f77bcf86cd799439011';
      const notFoundError = new NotFoundException('Candidato', candidateId);

      mockCandidatesService.inviteCandidate.mockRejectedValue(notFoundError);

      await expect(controller.invite(candidateId)).rejects.toThrow(NotFoundException);
      expect(service.inviteCandidate).toHaveBeenCalledWith(candidateId);
    });
  });

  describe('uninvite', () => {
    it('should uninvite a candidate successfully', async () => {
      const candidateId = '507f1f77bcf86cd799439011';
      const uninvitedCandidate = {
        ...mockCandidate,
        isInvited: false,
      };

      mockCandidatesService.uninviteCandidate.mockResolvedValue(uninvitedCandidate);

      const result = await controller.uninvite(candidateId);

      expect(service.uninviteCandidate).toHaveBeenCalledWith(candidateId);
      expect(result).toEqual({
        success: true,
        message: 'Convite cancelado com sucesso',
        data: uninvitedCandidate,
      });
    });

    it('should throw NotFoundException when candidate not found', async () => {
      const candidateId = '507f1f77bcf86cd799439011';
      const notFoundError = new NotFoundException('Candidato', candidateId);

      mockCandidatesService.uninviteCandidate.mockRejectedValue(notFoundError);

      await expect(controller.uninvite(candidateId)).rejects.toThrow(NotFoundException);
      expect(service.uninviteCandidate).toHaveBeenCalledWith(candidateId);
    });
  });
});
