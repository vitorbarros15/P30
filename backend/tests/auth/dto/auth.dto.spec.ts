import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { RegisterDto } from '../../../src/modules/auth/dto/register.dto';
import { LoginDto } from '../../../src/modules/auth/dto/login.dto';

describe('Auth DTOs', () => {
  describe('RegisterDto', () => {
    it('should validate a valid register DTO', async () => {
      const validDto = {
        name: 'João Silva',
        email: 'joao@email.com',
        password: '123456',
      };

      const dto = plainToClass(RegisterDto, validDto);
      const errors = await validate(dto);

      expect(errors).toHaveLength(0);
    });

    it('should fail validation with empty name', async () => {
      const invalidDto = {
        name: '',
        email: 'joao@email.com',
        password: '123456',
      };

      const dto = plainToClass(RegisterDto, invalidDto);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('name');
      expect(errors[0].constraints?.minLength).toBeDefined();
    });

    it('should fail validation with name too short', async () => {
      const invalidDto = {
        name: 'J',
        email: 'joao@email.com',
        password: '123456',
      };

      const dto = plainToClass(RegisterDto, invalidDto);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('name');
    });

    it('should fail validation with name too long', async () => {
      const invalidDto = {
        name: 'A'.repeat(101),
        email: 'joao@email.com',
        password: '123456',
      };

      const dto = plainToClass(RegisterDto, invalidDto);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('name');
    });

    it('should fail validation with invalid email', async () => {
      const invalidDto = {
        name: 'João Silva',
        email: 'invalid-email',
        password: '123456',
      };

      const dto = plainToClass(RegisterDto, invalidDto);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('email');
    });

    it('should fail validation with short password', async () => {
      const invalidDto = {
        name: 'João Silva',
        email: 'joao@email.com',
        password: '123',
      };

      const dto = plainToClass(RegisterDto, invalidDto);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('password');
    });

    it('should fail validation with missing required fields', async () => {
      const invalidDto = {};

      const dto = plainToClass(RegisterDto, invalidDto);
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(error => error.property === 'name')).toBe(true);
      expect(errors.some(error => error.property === 'email')).toBe(true);
      expect(errors.some(error => error.property === 'password')).toBe(true);
    });
  });

  describe('LoginDto', () => {
    it('should validate a valid login DTO', async () => {
      const validDto = {
        email: 'joao@email.com',
        password: '123456',
      };

      const dto = plainToClass(LoginDto, validDto);
      const errors = await validate(dto);

      expect(errors).toHaveLength(0);
    });

    it('should fail validation with invalid email', async () => {
      const invalidDto = {
        email: 'invalid-email',
        password: '123456',
      };

      const dto = plainToClass(LoginDto, invalidDto);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('email');
    });

    it('should fail validation with short password', async () => {
      const invalidDto = {
        email: 'joao@email.com',
        password: '123',
      };

      const dto = plainToClass(LoginDto, invalidDto);
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('password');
    });

    it('should fail validation with missing required fields', async () => {
      const invalidDto = {};

      const dto = plainToClass(LoginDto, invalidDto);
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(error => error.property === 'email')).toBe(true);
      expect(errors.some(error => error.property === 'password')).toBe(true);
    });
  });
});
