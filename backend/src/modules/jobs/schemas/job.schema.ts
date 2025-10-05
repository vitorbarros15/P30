import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({ timestamps: true, versionKey: false })
export class Job {
  @Prop({ required: true, trim: true, maxlength: 100 })
  title: string;

  @Prop({ required: true, trim: true, minlength: 10, maxlength: 2000 })
  description: string;

  @Prop({ required: true, trim: true, maxlength: 100 })
  location: string;

  @Prop({ required: true, trim: true, maxlength: 50 })
  salaryRange: string;

  @Prop({
    type: [String],
    required: true,
    validate: {
      validator: function(skills: string[]) {
        return skills.length > 0 && skills.length <= 20;
      },
      message: 'Pelo menos uma skill é obrigatória e máximo 20 skills permitidas',
    },
  })
  skills: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);

// Indexes for better performance
JobSchema.index({ title: 'text', description: 'text', location: 'text' });
JobSchema.index({ skills: 1 });
JobSchema.index({ createdAt: -1 });

// Pre-save middleware for validation
JobSchema.pre('save', function(next) {
  // Remove duplicates from skills array and normalize
  this.skills = [...new Set(this.skills.map(skill => skill.trim().toLowerCase()))];
  next();
});
