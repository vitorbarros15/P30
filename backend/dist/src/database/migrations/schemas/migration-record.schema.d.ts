import { Document } from 'mongoose';
export type MigrationRecordDocument = MigrationRecord & Document;
export declare class MigrationRecord {
    name: string;
    version: number;
    description: string;
    executedAt: Date;
}
export declare const MigrationRecordSchema: import("mongoose").Schema<MigrationRecord, import("mongoose").Model<MigrationRecord, any, any, any, Document<unknown, any, MigrationRecord, any, {}> & MigrationRecord & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MigrationRecord, Document<unknown, {}, import("mongoose").FlatRecord<MigrationRecord>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<MigrationRecord> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
