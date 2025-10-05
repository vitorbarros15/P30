import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MigrationRecordDocument = MigrationRecord & Document;

@Schema({ timestamps: true, versionKey: false })
export class MigrationRecord {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  version: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  executedAt: Date;
}

export const MigrationRecordSchema = SchemaFactory.createForClass(MigrationRecord);
