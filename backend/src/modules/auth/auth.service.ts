import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Usuário já existe com este email');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = new this.userModel({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();

    // Generate JWT
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

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userModel.findOne({ email, isActive: true });
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Generate JWT
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

  async validateUser(userId: string) {
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
}
