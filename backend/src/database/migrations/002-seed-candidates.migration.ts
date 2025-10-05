import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Migration } from './migration.interface';
import { Candidate, CandidateDocument } from '../../modules/candidates/schemas/candidate.schema';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SeedCandidatesMigration implements Migration {
  name = '002-seed-candidates';
  version = 2;
  description = 'Seed candidates from JSON file';

  constructor(
    @InjectModel(Candidate.name) private candidateModel: Model<CandidateDocument>,
  ) {}

  async up(): Promise<void> {
    try {
      const existingCandidates = await this.candidateModel.countDocuments();
      
      if (existingCandidates === 0) {
        const seedPath = path.join(process.cwd(), 'seeds', 'candidates.seed.json');
        
        if (fs.existsSync(seedPath)) {
          const candidatesData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
          
          await this.candidateModel.insertMany(candidatesData);
          console.log(`Seeded ${candidatesData.length} candidates`);
        } else {
          console.log('Candidates seed file not found');
        }
      } else {
        console.log(`${existingCandidates} candidates already exist`);
      }
    } catch (error) {
      console.error('Error seeding candidates:', error);
      throw error;
    }
  }

  async down(): Promise<void> {
    await this.candidateModel.deleteMany({});
    console.log('🗑️  All candidates removed');
  }
}
