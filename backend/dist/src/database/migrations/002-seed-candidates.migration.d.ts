import { Model } from 'mongoose';
import { Migration } from './migration.interface';
import { CandidateDocument } from '../../modules/candidates/schemas/candidate.schema';
export declare class SeedCandidatesMigration implements Migration {
    private candidateModel;
    name: string;
    version: number;
    description: string;
    constructor(candidateModel: Model<CandidateDocument>);
    up(): Promise<void>;
    down(): Promise<void>;
}
