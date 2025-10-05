import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CandidateQueryDto } from './dto/candidate-query.dto';
export declare class CandidatesController {
    private readonly candidatesService;
    constructor(candidatesService: CandidatesService);
    create(createCandidateDto: CreateCandidateDto): Promise<{
        success: boolean;
        message: string;
        data: import("./schemas/candidate.schema").Candidate;
    }>;
    findAll(query: CandidateQueryDto): Promise<{
        success: boolean;
        data: {
            candidates: (import("mongoose").FlattenMaps<import("./schemas/candidate.schema").CandidateDocument> & Required<{
                _id: import("mongoose").FlattenMaps<unknown>;
            }> & {
                __v: number;
            })[];
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
        data: import("./schemas/candidate.schema").Candidate;
    }>;
    update(id: string, updateCandidateDto: UpdateCandidateDto): Promise<{
        success: boolean;
        message: string;
        data: import("./schemas/candidate.schema").Candidate;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
        };
    }>;
    invite(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("./schemas/candidate.schema").Candidate;
    }>;
    uninvite(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("./schemas/candidate.schema").Candidate;
    }>;
}
