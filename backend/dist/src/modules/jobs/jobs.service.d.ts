import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobQueryDto } from './dto/job-query.dto';
export declare class JobsService {
    private jobModel;
    constructor(jobModel: Model<JobDocument>);
    create(createJobDto: CreateJobDto): Promise<Job>;
    findAll(query: JobQueryDto): Promise<{
        jobs: Job[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    findOne(id: string): Promise<Job>;
    update(id: string, updateJobDto: UpdateJobDto): Promise<Job>;
    remove(id: string): Promise<{
        id: string;
        message: string;
    }>;
    private isValidObjectId;
}
