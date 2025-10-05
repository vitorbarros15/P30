import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { MigrationsService } from '../src/database/migrations/migrations.service';

async function runMigrations() {
  console.log('🚀 Starting migrations...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const migrationsService = app.get(MigrationsService);
  
  try {
    await migrationsService.runAllMigrations();
    console.log('✅ All migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

runMigrations();
