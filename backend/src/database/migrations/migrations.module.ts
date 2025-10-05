import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MigrationRunnerService } from './migration-runner.service';
import { MigrationsService } from './migrations.service';
import { MigrationsController } from './migrations.controller';
import { MigrationRecord, MigrationRecordSchema } from './schemas/migration-record.schema';
import { CreateDefaultUserMigration } from './001-create-default-user.migration';
import { SeedCandidatesMigration } from './002-seed-candidates.migration';
import { User, UserSchema } from '../../modules/auth/schemas/user.schema';
import { CandidatesModule } from '../../modules/candidates/candidates.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MigrationRecord.name, schema: MigrationRecordSchema },
      { name: User.name, schema: UserSchema },
    ]),
    CandidatesModule,
  ],
  controllers: [MigrationsController],
  providers: [
    MigrationRunnerService,
    MigrationsService,
    CreateDefaultUserMigration,
    SeedCandidatesMigration,
  ],
  exports: [MigrationRunnerService, MigrationsService],
})
export class MigrationsModule {}
