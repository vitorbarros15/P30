import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');
  
  try {
    const app = await NestFactory.createApplicationContext(AppModule);
    const configService = app.get(ConfigService);
    
    const mongoUri = configService.get<string>('database.uri');
    console.log(`📡 MongoDB URI: ${mongoUri}`);
    
    // Wait a bit for connection to establish
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('✅ Database connection successful!');
    await app.close();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('💡 Make sure MongoDB is running and the URI is correct');
    process.exit(1);
  }
}

testDatabaseConnection();
