import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(helmet());

  const corsOrigins = configService.get('app.cors.origin');
  app.enableCors({
    origin: (origin, callback) => {
      
      if (!origin) {
        return callback(null, true);
      }
      
      
      if (corsOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`🚫 CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Authorization'],
    maxAge: 3600,
  });

  console.log('🌐 CORS enabled for origins:', corsOrigins);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('P30 Jobs API')
    .setDescription('API para gerenciamento de vagas e candidatos')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth', 'Autenticação e autorização')
    .addTag('Jobs', 'Gerenciamento de vagas')
    .addTag('Candidates', 'Gerenciamento de candidatos')
    .addTag('Migrations', 'Migrações do banco de dados')
    .build();
  
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });
  
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const port = configService.get('app.port') || 3001;
  await app.listen(port);
  
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📊 Environment: ${configService.get('app.nodeEnv')}`);
  console.log(`🔗 Health check: http:
  console.log(`📚 API Documentation: http:
  console.log(`🔐 Default admin: admin@p30.com / 123456`);
  console.log(`💡 Run migrations manually: npm run migration:run`);
}

bootstrap();
