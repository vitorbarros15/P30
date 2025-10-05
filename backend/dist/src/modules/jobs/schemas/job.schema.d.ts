import { Document } from 'mongoose';
export type JobDocument = Job & Document;
export declare class Job {
    title: string;
    description: string;
    location: string;
    salaryRange: string;
    skills: string[];
    createdAt: Date;
}
export declare const JobSchema: import("mongoose").Schema<Job, import("mongoose").Model<Job, any, any, any, Document<unknown, any, Job, any, {}> & Job & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Job, Document<unknown, {}, import("mongoose").FlatRecord<Job>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Job> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
