import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CandidateDocument = Candidate & Document;

@Schema({ timestamps: true, versionKey: false })
export class Candidate {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({
    type: [String],
    required: true,
    validate: {
      validator: function(skills: string[]) {
        return skills.length > 0;
      },
      message: 'Pelo menos uma skill é obrigatória',
    },
  })
  skills: string[];

  @Prop({ required: true, min: 0, max: 50 })
  experienceYears: number;

  @Prop({ default: false })
  isInvited: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);

CandidateSchema.index({ skills: 1 });
CandidateSchema.index({ experienceYears: 1 });
CandidateSchema.index({ isInvited: 1 });

CandidateSchema.pre('save', function(next) {
  this.skills = [...new Set(this.skills.map(skill => skill.trim().toLowerCase()))];
  next();
});
