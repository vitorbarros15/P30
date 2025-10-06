"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('app', () => {
    const corsOrigin = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
        : ['http://localhost:3000'];
    return {
        port: parseInt(process.env.PORT, 10) || 3001,
        nodeEnv: process.env.NODE_ENV || 'development',
        jwt: {
            secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
            expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        },
        cors: {
            origin: corsOrigin,
        },
        rateLimit: {
            windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000,
            maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
        },
    };
});
//# sourceMappingURL=app.config.js.map