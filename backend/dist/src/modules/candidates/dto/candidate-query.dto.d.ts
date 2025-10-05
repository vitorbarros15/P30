export declare class CandidateQueryDto {
    page?: number;
    limit?: number;
    name?: string;
    email?: string;
    skills?: string[];
    minExperience?: number;
    maxExperience?: number;
    isInvited?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
