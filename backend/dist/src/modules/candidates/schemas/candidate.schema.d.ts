import { Document } from 'mongoose';
export type CandidateDocument = Candidate & Document;
export declare class Candidate {
    name: string;
    email: string;
    skills: string[];
    experienceYears: number;
    isInvited: boolean;
    createdAt: Date;
}
export declare const CandidateSchema: import("mongoose").Schema<Candidate, import("mongoose").Model<Candidate, any, any, any, Document<unknown, any, Candidate, any, {}> & Candidate & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Candidate, Document<unknown, {}, import("mongoose").FlatRecord<Candidate>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Candidate> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
