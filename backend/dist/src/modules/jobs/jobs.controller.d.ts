import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobQueryDto } from './dto/job-query.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    create(createJobDto: CreateJobDto): Promise<{
        success: boolean;
        message: string;
        data: import("./schemas/job.schema").Job;
    }>;
    findAll(query: JobQueryDto): Promise<{
        success: boolean;
        data: {
            jobs: import("./schemas/job.schema").Job[];
            pagination: {
                page: number;
                limit: number;
                total: number;
                totalPages: number;
                hasNext: boolean;
                hasPrev: boolean;
            };
        };
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: import("./schemas/job.schema").Job;
    }>;
    update(id: string, updateJobDto: UpdateJobDto): Promise<{
        success: boolean;
        message: string;
        data: import("./schemas/job.schema").Job;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
        };
    }>;
}
