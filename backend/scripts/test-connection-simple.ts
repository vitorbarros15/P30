import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');
  
  try {
    const app = await NestFactory.createApplicationContext(AppModule);
    
    // Wait a bit for connection to establish
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('✅ Database connection successful!');
    console.log('📊 MongoDB URI loaded from .env');
    await app.close();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('💡 Make sure MongoDB is running and the URI is correct');
    console.error('💡 Check if .env file exists with MONGODB_URI');
    process.exit(1);
  }
}

testDatabaseConnection();
