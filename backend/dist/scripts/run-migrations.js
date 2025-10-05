"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const migrations_service_1 = require("../src/database/migrations/migrations.service");
async function runMigrations() {
    console.log('🚀 Starting migrations...');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const migrationsService = app.get(migrations_service_1.MigrationsService);
    try {
        await migrationsService.runAllMigrations();
        console.log('✅ All migrations completed successfully!');
    }
    catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
    finally {
        await app.close();
    }
}
runMigrations();
//# sourceMappingURL=run-migrations.js.map