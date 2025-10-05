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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_schema_1 = require("./schemas/user.schema");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const { email, password, name } = registerDto;
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new common_1.ConflictException('Usuário já existe com este email');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new this.userModel({
            email,
            password: hashedPassword,
            name,
        });
        await user.save();
        const payload = { email: user.email, sub: user._id };
        const token = this.jwtService.sign(payload);
        return {
            success: true,
            message: 'Usuário criado com sucesso',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
                token,
            },
        };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email, isActive: true });
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const payload = { email: user.email, sub: user._id };
        const token = this.jwtService.sign(payload);
        return {
            success: true,
            message: 'Login realizado com sucesso',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
                token,
            },
        };
    }
    async validateUser(userId) {
        const user = await this.userModel.findById(userId).select('-password');
        return user;
    }
    async createDefaultUser() {
        const existingAdmin = await this.userModel.findOne({ email: 'admin@p30.com' });
        if (!existingAdmin) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash('123456', saltRounds);
            const admin = new this.userModel({
                email: 'admin@p30.com',
                password: hashedPassword,
                name: 'Admin P30',
                role: 'admin',
            });
            await admin.save();
            console.log('✅ Usuário admin criado: admin@p30.com / 123456');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map