import { Model } from 'mongoose';
import { UserDocument } from '../../modules/auth/schemas/user.schema';
import { Migration } from './migration.interface';
export declare class CreateDefaultUserMigration implements Migration {
    private userModel;
    name: string;
    version: number;
    description: string;
    constructor(userModel: Model<UserDocument>);
    up(): Promise<void>;
    down(): Promise<void>;
}
