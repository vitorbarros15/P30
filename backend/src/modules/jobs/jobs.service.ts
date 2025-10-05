import { Injectable } from '@nestjs/common';
import { NotFoundException, ConflictException, ValidationException } from '../../shared/exceptions/business.exception';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobQueryDto } from './dto/job-query.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    try {
      const createdJob = new this.jobModel(createJobDto);
      return await createdJob.save();
    } catch (error) {
      throw new BadRequestException('Erro ao criar vaga: ' + error.message);
    }
  }

  async findAll(query: JobQueryDto): Promise<{
    jobs: Job[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }> {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    // Build search filter
    const filter: any = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const [jobs, total] = await Promise.all([
      this.jobModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.jobModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      jobs,
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

  async findOne(id: string): Promise<Job> {
    if (!this.isValidObjectId(id)) {
      throw new ValidationException('ID inválido', { field: 'id', value: id });
    }

    const job = await this.jobModel.findById(id).lean().exec();
    if (!job) {
      throw new NotFoundException('Vaga', id);
    }

    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    if (!this.isValidObjectId(id)) {
      throw new BadRequestException('ID inválido');
    }

    const updatedJob = await this.jobModel
      .findByIdAndUpdate(id, updateJobDto, { new: true, runValidators: true })
      .lean()
      .exec();

    if (!updatedJob) {
      throw new NotFoundException('Vaga não encontrada');
    }

    return updatedJob;
  }

  async remove(id: string): Promise<{ id: string; message: string }> {
    if (!this.isValidObjectId(id)) {
      throw new BadRequestException('ID inválido');
    }

    const deletedJob = await this.jobModel.findByIdAndDelete(id).lean().exec();
    if (!deletedJob) {
      throw new NotFoundException('Vaga não encontrada');
    }

    return { id, message: 'Vaga deletada com sucesso' };
  }

  private isValidObjectId(id: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }
}
