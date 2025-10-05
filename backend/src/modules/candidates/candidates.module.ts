import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidate, CandidateSchema } from './schemas/candidate.schema';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candidate.name, schema: CandidateSchema },
    ]),
  ],
  controllers: [CandidatesController],
  providers: [CandidatesService],
  exports: [CandidatesService, MongooseModule],
})
export class CandidatesModule {}
