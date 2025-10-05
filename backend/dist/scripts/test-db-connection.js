"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const config_1 = require("@nestjs/config");
const dotenv = require("dotenv");
dotenv.config({ path: '.env' });
async function testDatabaseConnection() {
    console.log('🔍 Testing database connection...');
    try {
        const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
        const configService = app.get(config_1.ConfigService);
        const mongoUri = configService.get('database.uri');
        console.log(`📡 MongoDB URI: ${mongoUri}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('✅ Database connection successful!');
        await app.close();
    }
    catch (error) {
        console.error('❌ Database connection failed:', error.message);
        console.error('💡 Make sure MongoDB is running and the URI is correct');
        process.exit(1);
    }
}
testDatabaseConnection();
//# sourceMappingURL=test-db-connection.js.map