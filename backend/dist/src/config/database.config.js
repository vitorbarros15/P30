"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('database', () => ({
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/p30-nestjs',
    testUri: process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/p30-nestjs-test',
}));
//# sourceMappingURL=database.config.js.map