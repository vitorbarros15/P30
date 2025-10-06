import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CandidatesService } from '../../src/modules/candidates/candidates.service';
import { Candidate } from '../../src/modules/candidates/schemas/candidate.schema';
import { CreateCandidateDto } from '../../src/modules/candidates/dto/create-candidate.dto';
import { UpdateCandidateDto } from '../../src/modules/candidates/dto/update-candidate.dto';
import { CandidateQueryDto } from '../../src/modules/candidates/dto/candidate-query.dto';
import { NotFoundException, ValidationException, ConflictException } from '../../src/shared/exceptions/business.exception';

describe('CandidatesService', () => {
  let service: CandidatesService;
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
    save: jest.fn(),
  };

  beforeEach(async () => {
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

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandidatesService,
        {
          provide: getModelToken(Candidate.name),
          useValue: MockCandidateConstructor,
        },
      ],
    }).compile();

    service = module.get<CandidatesService>(CandidatesService);
    candidateModel = module.get<any>(getModelToken(Candidate.name));
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

      candidateModel.findOne.mockResolvedValue(null);

      const result = await service.create(createCandidateDto);

      expect(candidateModel.findOne).toHaveBeenCalledWith({
        email: createCandidateDto.email,
      });
      expect(result).toEqual({
        _id: '507f1f77bcf86cd799439011',
        ...createCandidateDto,
        skills: ['javascript', 'node.js', 'react'],
      });
    });

    it('should throw ConflictException when email already exists', async () => {
      const createCandidateDto: CreateCandidateDto = {
        name: 'João Silva',
        email: 'joao@email.com',
        skills: ['JavaScript', 'Node.js'],
        experienceYears: 3,
      };

      candidateModel.findOne.mockResolvedValue(mockCandidate);

      await expect(service.create(createCandidateDto)).rejects.toThrow(ConflictException);
      expect(candidateModel.findOne).toHaveBeenCalledWith({
        email: createCandidateDto.email,
      });
    });

    it('should normalize skills to lowercase', async () => {
      const createCandidateDto: CreateCandidateDto = {
        name: 'João Silva',
        email: 'joao@email.com',
        skills: ['JavaScript', 'Node.js', 'React', 'TypeScript'],
        experienceYears: 3,
      };

      candidateModel.findOne.mockResolvedValue(null);

      await service.create(createCandidateDto);

      expect(candidateModel).toHaveBeenCalledWith({
        ...createCandidateDto,
        skills: ['javascript', 'node.js', 'react', 'typescript'],
      });
    });
  });

  describe('findAll', () => {
    it('should return paginated candidates with default parameters', async () => {
      const query: CandidateQueryDto = {};
      const mockCandidates = [mockCandidate];
      const mockCount = 1;

      candidateModel.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockCandidates),
      });
      candidateModel.countDocuments.mockResolvedValue(mockCount);

      const result = await service.findAll(query);

      expect(candidateModel.find).toHaveBeenCalled();
      expect(candidateModel.countDocuments).toHaveBeenCalled();
      expect(result).toEqual({
        candidates: mockCandidates,
        pagination: {
          page: 1,
          limit: 10,
          total: mockCount,
          totalPages: 1,
        },
      });
    });

    it('should filter candidates by name', async () => {
      const query: CandidateQueryDto = {
        name: 'João',
        page: 1,
        limit: 10,
      };

      candidateModel.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([mockCandidate]),
      });
      candidateModel.countDocuments.mockResolvedValue(1);

      await service.findAll(query);

      expect(candidateModel.find).toHaveBeenCalledWith({
        name: { $regex: 'João', $options: 'i' },
      });
    });

    it('should filter candidates by skills', async () => {
      const query: CandidateQueryDto = {
        skills: ['javascript', 'react'],
        page: 1,
        limit: 10,
      };

      candidateModel.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([mockCandidate]),
      });
      candidateModel.countDocuments.mockResolvedValue(1);

      await service.findAll(query);

      expect(candidateModel.find).toHaveBeenCalledWith({
        skills: { $in: ['javascript', 'react'] },
      });
    });

    it('should filter candidates by experience range', async () => {
      const query: CandidateQueryDto = {
        minExperience: 2,
        maxExperience: 5,
        page: 1,
        limit: 10,
      };

      candidateModel.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([mockCandidate]),
      });
      candidateModel.countDocuments.mockResolvedValue(1);

      await service.findAll(query);

      expect(candidateModel.find).toHaveBeenCalledWith({
        experienceYears: { $gte: 2, $lte: 5 },
      });
    });

    it('should filter candidates by invitation status', async () => {
      const query: CandidateQueryDto = {
        isInvited: true,
        page: 1,
        limit: 10,
      };

      candidateModel.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([mockCandidate]),
      });
      candidateModel.countDocuments.mockResolvedValue(1);

      await service.findAll(query);

      expect(candidateModel.find).toHaveBeenCalledWith({
        isInvited: true,
      });
    });
  });

  describe('findOne', () => {
    it('should return a candidate by id', async () => {
      const candidateId = '507f1f77bcf86cd799439011';

      candidateModel.findById.mockResolvedValue(mockCandidate);

      const result = await service.findOne(candidateId);

      expect(candidateModel.findById).toHaveBeenCalledWith(candidateId);
      expect(result).toEqual(mockCandidate);
    });

    it('should throw ValidationException for invalid id', async () => {
      const invalidId = 'invalid-id';

      await expect(service.findOne(invalidId)).rejects.toThrow(ValidationException);
    });

    it('should throw NotFoundException when candidate not found', async () => {
      const candidateId = '507f1f77bcf86cd799439011';

      candidateModel.findById.mockResolvedValue(null);

      await expect(service.findOne(candidateId)).rejects.toThrow(NotFoundException);
      expect(candidateModel.findById).toHaveBeenCalledWith(candidateId);
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

      candidateModel.findByIdAndUpdate.mockResolvedValue(updatedCandidate);

      const result = await service.update(candidateId, updateCandidateDto);

      expect(candidateModel.findByIdAndUpdate).toHaveBeenCalledWith(
        candidateId,
        { ...updateCandidateDto, skills: ['javascript', 'node.js', 'react', 'typescript'] },
        { new: true, runValidators: true },
      );
      expect(result).toEqual(updatedCandidate);
    });

    it('should throw ValidationException for invalid id', async () => {
      const invalidId = 'invalid-id';
      const updateCandidateDto: UpdateCandidateDto = {
        name: 'João Silva Santos',
      };

      await expect(service.update(invalidId, updateCandidateDto)).rejects.toThrow(ValidationException);
    });

    it('should throw NotFoundException when candidate not found', async () => {
      const candidateId = '507f1f77bcf86cd799439011';
      const updateCandidateDto: UpdateCandidateDto = {
        name: 'João Silva Santos',
      };

      candidateModel.findByIdAndUpdate.mockResolvedValue(null);

      await expect(service.update(candidateId, updateCandidateDto)).rejects.toThrow(NotFoundException);
      expect(candidateModel.findByIdAndUpdate).toHaveBeenCalledWith(
        candidateId,
        updateCandidateDto,
        { new: true, runValidators: true },
      );
    });
  });

  describe('remove', () => {
    it('should remove a candidate successfully', async () => {
      const candidateId = '507f1f77bcf86cd799439011';

      candidateModel.findByIdAndDelete.mockResolvedValue(mockCandidate);

      const result = await service.remove(candidateId);

      expect(candidateModel.findByIdAndDelete).toHaveBeenCalledWith(candidateId);
      expect(result).toEqual({
        id: candidateId,
        message: 'Candidato deletado com sucesso',
      });
    });

    it('should throw ValidationException for invalid id', async () => {
      const invalidId = 'invalid-id';

      await expect(service.remove(invalidId)).rejects.toThrow(ValidationException);
    });

    it('should throw NotFoundException when candidate not found', async () => {
      const candidateId = '507f1f77bcf86cd799439011';

      candidateModel.findByIdAndDelete.mockResolvedValue(null);

      await expect(service.remove(candidateId)).rejects.toThrow(NotFoundException);
      expect(candidateModel.findByIdAndDelete).toHaveBeenCalledWith(candidateId);
    });
  });

  describe('inviteCandidate', () => {
    it('should invite a candidate successfully', async () => {
      const candidateId = '507f1f77bcf86cd799439011';
      const invitedCandidate = {
        ...mockCandidate,
        isInvited: true,
      };

      candidateModel.findByIdAndUpdate.mockResolvedValue(invitedCandidate);

      const result = await service.inviteCandidate(candidateId);

      expect(candidateModel.findByIdAndUpdate).toHaveBeenCalledWith(
        candidateId,
        { isInvited: true },
        { new: true },
      );
      expect(result).toEqual(invitedCandidate);
    });

    it('should throw ValidationException for invalid id', async () => {
      const invalidId = 'invalid-id';

      await expect(service.inviteCandidate(invalidId)).rejects.toThrow(ValidationException);
    });

    it('should throw NotFoundException when candidate not found', async () => {
      const candidateId = '507f1f77bcf86cd799439011';

      candidateModel.findByIdAndUpdate.mockResolvedValue(null);

      await expect(service.inviteCandidate(candidateId)).rejects.toThrow(NotFoundException);
      expect(candidateModel.findByIdAndUpdate).toHaveBeenCalledWith(
        candidateId,
        { isInvited: true },
        { new: true },
      );
    });
  });

  describe('uninviteCandidate', () => {
    it('should uninvite a candidate successfully', async () => {
      const candidateId = '507f1f77bcf86cd799439011';
      const uninvitedCandidate = {
        ...mockCandidate,
        isInvited: false,
      };

      candidateModel.findByIdAndUpdate.mockResolvedValue(uninvitedCandidate);

      const result = await service.uninviteCandidate(candidateId);

      expect(candidateModel.findByIdAndUpdate).toHaveBeenCalledWith(
        candidateId,
        { isInvited: false },
        { new: true },
      );
      expect(result).toEqual(uninvitedCandidate);
    });

    it('should throw ValidationException for invalid id', async () => {
      const invalidId = 'invalid-id';

      await expect(service.uninviteCandidate(invalidId)).rejects.toThrow(ValidationException);
    });

    it('should throw NotFoundException when candidate not found', async () => {
      const candidateId = '507f1f77bcf86cd799439011';

      candidateModel.findByIdAndUpdate.mockResolvedValue(null);

      await expect(service.uninviteCandidate(candidateId)).rejects.toThrow(NotFoundException);
      expect(candidateModel.findByIdAndUpdate).toHaveBeenCalledWith(
        candidateId,
        { isInvited: false },
        { new: true },
      );
    });
  });
});
