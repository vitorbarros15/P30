import { Model } from 'mongoose';
import { Candidate, CandidateDocument } from './schemas/candidate.schema';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CandidateQueryDto } from './dto/candidate-query.dto';
export declare class CandidatesService {
    private candidateModel;
    constructor(candidateModel: Model<CandidateDocument>);
    create(createCandidateDto: CreateCandidateDto): Promise<Candidate>;
    findAll(query: CandidateQueryDto): Promise<{
        candidates: (import("mongoose").FlattenMaps<CandidateDocument> & Required<{
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
    }>;
    findOne(id: string): Promise<Candidate>;
    update(id: string, updateCandidateDto: UpdateCandidateDto): Promise<Candidate>;
    remove(id: string): Promise<{
        id: string;
        message: string;
    }>;
    inviteCandidate(id: string): Promise<Candidate>;
    uninviteCandidate(id: string): Promise<Candidate>;
    private isValidObjectId;
}
