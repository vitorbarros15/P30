"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.use((0, helmet_1.default)());
    const corsOrigins = configService.get('app.cors.origin');
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin) {
                return callback(null, true);
            }
            if (corsOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
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
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('P30 Jobs API')
        .setDescription('API para gerenciamento de vagas e candidatos')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Auth', 'Autenticação e autorização')
        .addTag('Jobs', 'Gerenciamento de vagas')
        .addTag('Candidates', 'Gerenciamento de candidatos')
        .addTag('Migrations', 'Migrações do banco de dados')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        operationIdFactory: (controllerKey, methodKey) => methodKey,
    });
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
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
  console.log(`, API, Documentation, http, console.log(`🔐 Default admin: admin@p30.com / 123456`));
    console.log(`💡 Run migrations manually: npm run migration:run`);
}
bootstrap();
//# sourceMappingURL=main.js.map