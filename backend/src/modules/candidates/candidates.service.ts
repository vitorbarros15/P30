import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Candidate, CandidateDocument } from './schemas/candidate.schema';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CandidateQueryDto } from './dto/candidate-query.dto';
import { NotFoundException, ValidationException, ConflictException } from '../../shared/exceptions/business.exception';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectModel(Candidate.name) private candidateModel: Model<CandidateDocument>,
  ) {}

  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    // Verificar se email já existe
    const existingCandidate = await this.candidateModel.findOne({
      email: createCandidateDto.email,
    });

    if (existingCandidate) {
      throw new ConflictException('Email já está em uso', {
        email: createCandidateDto.email,
      });
    }

    // Normalizar skills para lowercase
    const normalizedSkills = createCandidateDto.skills.map(skill =>
      skill.toLowerCase().trim(),
    );

    const candidate = new this.candidateModel({
      ...createCandidateDto,
      skills: normalizedSkills,
    });

    return candidate.save();
  }

  async findAll(query: CandidateQueryDto) {
    const {
      page = 1,
      limit = 10,
      name,
      email,
      skills,
      minExperience,
      maxExperience,
      isInvited,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const filter: any = {};

    // Filtros de texto
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    if (email) {
      filter.email = { $regex: email, $options: 'i' };
    }

    // Filtro por habilidades
    if (skills && skills.length > 0) {
      const normalizedSkills = skills.map(skill => skill.toLowerCase().trim());
      filter.skills = { $in: normalizedSkills };
    }

    // Filtro por experiência
    if (minExperience !== undefined || maxExperience !== undefined) {
      filter.experienceYears = {};
      if (minExperience !== undefined) {
        filter.experienceYears.$gte = minExperience;
      }
      if (maxExperience !== undefined) {
        filter.experienceYears.$lte = maxExperience;
      }
    }

    // Filtro por convite
    if (isInvited !== undefined) {
      filter.isInvited = isInvited;
    }

    // Configuração de ordenação
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const [candidates, total] = await Promise.all([
      this.candidateModel
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.candidateModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      candidates,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async findOne(id: string): Promise<Candidate> {
    if (!this.isValidObjectId(id)) {
      throw new ValidationException('ID inválido', { field: 'id', value: id });
    }

    const candidate = await this.candidateModel.findById(id).lean().exec();
    if (!candidate) {
      throw new NotFoundException('Candidato', id);
    }

    return candidate;
  }

  async update(id: string, updateCandidateDto: UpdateCandidateDto): Promise<Candidate> {
    if (!this.isValidObjectId(id)) {
      throw new ValidationException('ID inválido', { field: 'id', value: id });
    }

    // Verificar se candidato existe
    const existingCandidate = await this.candidateModel.findById(id);
    if (!existingCandidate) {
      throw new NotFoundException('Candidato', id);
    }

    // Se está atualizando email, verificar se já existe
    if (updateCandidateDto.email && updateCandidateDto.email !== existingCandidate.email) {
      const emailExists = await this.candidateModel.findOne({
        email: updateCandidateDto.email,
        _id: { $ne: id },
      });

      if (emailExists) {
        throw new ConflictException('Email já está em uso', {
          email: updateCandidateDto.email,
        });
      }
    }

    // Normalizar skills se fornecidas
    if (updateCandidateDto.skills) {
      updateCandidateDto.skills = updateCandidateDto.skills.map(skill =>
        skill.toLowerCase().trim(),
      );
    }

    const updatedCandidate = await this.candidateModel
      .findByIdAndUpdate(id, updateCandidateDto, { new: true })
      .lean()
      .exec();

    return updatedCandidate;
  }

  async remove(id: string): Promise<{ id: string; message: string }> {
    if (!this.isValidObjectId(id)) {
      throw new ValidationException('ID inválido', { field: 'id', value: id });
    }

    const candidate = await this.candidateModel.findByIdAndDelete(id);
    if (!candidate) {
      throw new NotFoundException('Candidato', id);
    }

    return {
      id,
      message: 'Candidato removido com sucesso',
    };
  }

  async inviteCandidate(id: string): Promise<Candidate> {
    if (!this.isValidObjectId(id)) {
      throw new ValidationException('ID inválido', { field: 'id', value: id });
    }

    const candidate = await this.candidateModel.findByIdAndUpdate(
      id,
      { isInvited: true },
      { new: true },
    ).lean().exec();

    if (!candidate) {
      throw new NotFoundException('Candidato', id);
    }

    return candidate;
  }

  async uninviteCandidate(id: string): Promise<Candidate> {
    if (!this.isValidObjectId(id)) {
      throw new ValidationException('ID inválido', { field: 'id', value: id });
    }

    const candidate = await this.candidateModel.findByIdAndUpdate(
      id,
      { isInvited: false },
      { new: true },
    ).lean().exec();

    if (!candidate) {
      throw new NotFoundException('Candidato', id);
    }

    return candidate;
  }

  private isValidObjectId(id: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }
}
