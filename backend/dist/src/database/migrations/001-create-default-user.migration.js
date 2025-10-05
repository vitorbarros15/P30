"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDefaultUserMigration = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const user_schema_1 = require("../../modules/auth/schemas/user.schema");
let CreateDefaultUserMigration = class CreateDefaultUserMigration {
    constructor(userModel) {
        this.userModel = userModel;
        this.name = '001-create-default-user';
        this.version = 1;
        this.description = 'Create default admin user for the application';
    }
    async up() {
        const existingAdmin = await this.userModel.findOne({ email: 'admin@p30.com' });
        if (!existingAdmin) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash('123456', saltRounds);
            const admin = new this.userModel({
                email: 'admin@p30.com',
                password: hashedPassword,
                name: 'Admin P30',
                role: 'admin',
                isActive: true,
            });
            await admin.save();
            console.log('Default admin user created: admin@p30.com / 123456');
        }
        else {
            console.log('Default admin user already exists');
        }
    }
    async down() {
        await this.userModel.deleteOne({ email: 'admin@p30.com' });
        console.log('🗑️  Default admin user removed');
    }
};
exports.CreateDefaultUserMigration = CreateDefaultUserMigration;
exports.CreateDefaultUserMigration = CreateDefaultUserMigration = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CreateDefaultUserMigration);
//# sourceMappingURL=001-create-default-user.migration.js.map