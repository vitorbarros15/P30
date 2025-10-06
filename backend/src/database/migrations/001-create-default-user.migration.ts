import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../../modules/auth/schemas/user.schema';
import { Migration } from './migration.interface';

@Injectable()
export class CreateDefaultUserMigration implements Migration {
  name = '001-create-default-user';
  version = 1;
  description = 'Create default admin user for the application';

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async up(): Promise<void> {
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
    } else {
      console.log('Default admin user already exists');
    }
  }

  async down(): Promise<void> {
    await this.userModel.deleteOne({ email: 'admin@p30.com' });
    console.log('🗑️  Default admin user removed');
  }
}
