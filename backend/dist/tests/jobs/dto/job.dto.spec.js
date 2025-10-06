"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_job_dto_1 = require("../../../src/modules/jobs/dto/create-job.dto");
const update_job_dto_1 = require("../../../src/modules/jobs/dto/update-job.dto");
const job_query_dto_1 = require("../../../src/modules/jobs/dto/job-query.dto");
describe('Job DTOs', () => {
    describe('CreateJobDto', () => {
        const validCreateJobDto = {
            title: 'Desenvolvedor Full Stack',
            description: 'Desenvolver aplicações web completas usando React e Node.js para projetos inovadores',
            location: 'São Paulo, SP',
            salaryRange: 'R$ 8.000 - R$ 12.000',
            skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
        };
        it('should validate a valid create job DTO', async () => {
            const dto = (0, class_transformer_1.plainToClass)(create_job_dto_1.CreateJobDto, validCreateJobDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(0);
        });
        it('should fail validation with empty title', async () => {
            const invalidDto = { ...validCreateJobDto, title: '' };
            const dto = (0, class_transformer_1.plainToClass)(create_job_dto_1.CreateJobDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('title');
            expect(errors[0].constraints).toHaveProperty('minLength');
        });
        it('should fail validation with title too long', async () => {
            const invalidDto = { ...validCreateJobDto, title: 'a'.repeat(101) };
            const dto = (0, class_transformer_1.plainToClass)(create_job_dto_1.CreateJobDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('title');
            expect(errors[0].constraints).toHaveProperty('maxLength');
        });
        it('should fail validation with description too short', async () => {
            const invalidDto = { ...validCreateJobDto, description: 'Short' };
            const dto = (0, class_transformer_1.plainToClass)(create_job_dto_1.CreateJobDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('description');
            expect(errors[0].constraints).toHaveProperty('minLength');
        });
        it('should fail validation with description too long', async () => {
            const invalidDto = { ...validCreateJobDto, description: 'a'.repeat(2001) };
            const dto = (0, class_transformer_1.plainToClass)(create_job_dto_1.CreateJobDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('description');
            expect(errors[0].constraints).toHaveProperty('maxLength');
        });
        it('should fail validation with empty location', async () => {
            const invalidDto = { ...validCreateJobDto, location: '' };
            const dto = (0, class_transformer_1.plainToClass)(create_job_dto_1.CreateJobDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('location');
            expect(errors[0].constraints).toHaveProperty('minLength');
        });
        it('should fail validation with location too long', async () => {
            const invalidDto = { ...validCreateJobDto, location: 'a'.repeat(101) };
            const dto = (0, class_transformer_1.plainToClass)(create_job_dto_1.CreateJobDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('location');
            expect(errors[0].constraints).toHaveProperty('maxLength');
        });
        it('should fail validation with empty salaryRange', async () => {
            const invalidDto = { ...validCreateJobDto, salaryRange: '' };
            const dto = (0, class_transformer_1.plainToClass)(create_job_dto_1.CreateJobDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('salaryRange');
            expect(errors[0].constraints).toHaveProperty('minLength');
        });
        it('should fail validation with salaryRange too long', async () => {
            const invalidDto = { ...validCreateJobDto, salaryRange: 'a'.repeat(51) };
            const dto = (0, class_transformer_1.plainToClass)(create_job_dto_1.CreateJobDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('salaryRange');
            expect(errors[0].constraints).toHaveProperty('maxLength');
        });
        it('should fail validation with empty skills array', async () => {
            const invalidDto = { ...validCreateJobDto, skills: [] };
            const dto = (0, class_transformer_1.plainToClass)(create_job_dto_1.CreateJobDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('skills');
            expect(errors[0].constraints).toHaveProperty('arrayMinSize');
        });
        it('should fail validation with too many skills', async () => {
            const invalidDto = { ...validCreateJobDto, skills: Array(21).fill('skill') };
            const dto = (0, class_transformer_1.plainToClass)(create_job_dto_1.CreateJobDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('skills');
            expect(errors[0].constraints).toHaveProperty('arrayMaxSize');
        });
        it('should fail validation with non-string skills', async () => {
            const invalidDto = { ...validCreateJobDto, skills: ['React', 123, 'Node.js'] };
            const dto = (0, class_transformer_1.plainToClass)(create_job_dto_1.CreateJobDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('skills');
            expect(errors[0].constraints).toHaveProperty('isString');
        });
        it('should fail validation with empty skill strings', async () => {
            const invalidDto = { ...validCreateJobDto, skills: ['React', '', 'Node.js'] };
            const dto = (0, class_transformer_1.plainToClass)(create_job_dto_1.CreateJobDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('skills');
            expect(errors[0].constraints).toHaveProperty('isNotEmpty');
        });
        it('should fail validation with missing required fields', async () => {
            const invalidDto = {};
            const dto = (0, class_transformer_1.plainToClass)(create_job_dto_1.CreateJobDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(5);
        });
    });
    describe('UpdateJobDto', () => {
        it('should validate with partial data', async () => {
            const updateDto = { title: 'New Title' };
            const dto = (0, class_transformer_1.plainToClass)(update_job_dto_1.UpdateJobDto, updateDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(0);
        });
        it('should validate with no data (all fields optional)', async () => {
            const updateDto = {};
            const dto = (0, class_transformer_1.plainToClass)(update_job_dto_1.UpdateJobDto, updateDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(0);
        });
        it('should inherit validation rules from CreateJobDto', async () => {
            const invalidDto = { title: 'a'.repeat(101) };
            const dto = (0, class_transformer_1.plainToClass)(update_job_dto_1.UpdateJobDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('title');
            expect(errors[0].constraints).toHaveProperty('maxLength');
        });
    });
    describe('JobQueryDto', () => {
        it('should validate a valid query DTO', async () => {
            const queryDto = { page: 1, limit: 10, search: 'React' };
            const dto = (0, class_transformer_1.plainToClass)(job_query_dto_1.JobQueryDto, queryDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(0);
        });
        it('should validate with default values', async () => {
            const queryDto = {};
            const dto = (0, class_transformer_1.plainToClass)(job_query_dto_1.JobQueryDto, queryDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(0);
            expect(dto.page).toBe(1);
            expect(dto.limit).toBe(10);
        });
        it('should fail validation with invalid page number', async () => {
            const invalidDto = { page: 0 };
            const dto = (0, class_transformer_1.plainToClass)(job_query_dto_1.JobQueryDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('page');
            expect(errors[0].constraints).toHaveProperty('min');
        });
        it('should fail validation with negative page number', async () => {
            const invalidDto = { page: -1 };
            const dto = (0, class_transformer_1.plainToClass)(job_query_dto_1.JobQueryDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('page');
            expect(errors[0].constraints).toHaveProperty('min');
        });
        it('should fail validation with non-integer page', async () => {
            const invalidDto = { page: 'invalid' };
            const dto = (0, class_transformer_1.plainToClass)(job_query_dto_1.JobQueryDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('page');
            expect(errors[0].constraints).toHaveProperty('isInt');
        });
        it('should fail validation with invalid limit number', async () => {
            const invalidDto = { limit: 0 };
            const dto = (0, class_transformer_1.plainToClass)(job_query_dto_1.JobQueryDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('limit');
            expect(errors[0].constraints).toHaveProperty('min');
        });
        it('should fail validation with limit too high', async () => {
            const invalidDto = { limit: 101 };
            const dto = (0, class_transformer_1.plainToClass)(job_query_dto_1.JobQueryDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('limit');
            expect(errors[0].constraints).toHaveProperty('max');
        });
        it('should fail validation with non-integer limit', async () => {
            const invalidDto = { limit: 'invalid' };
            const dto = (0, class_transformer_1.plainToClass)(job_query_dto_1.JobQueryDto, invalidDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('limit');
            expect(errors[0].constraints).toHaveProperty('isInt');
        });
        it('should validate with only search parameter', async () => {
            const queryDto = { search: 'React Developer' };
            const dto = (0, class_transformer_1.plainToClass)(job_query_dto_1.JobQueryDto, queryDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(0);
        });
        it('should validate with string page and limit (transformation)', async () => {
            const queryDto = { page: '2', limit: '20' };
            const dto = (0, class_transformer_1.plainToClass)(job_query_dto_1.JobQueryDto, queryDto);
            const errors = await (0, class_validator_1.validate)(dto);
            expect(errors).toHaveLength(0);
            expect(dto.page).toBe(2);
            expect(dto.limit).toBe(20);
        });
    });
});
//# sourceMappingURL=job.dto.spec.js.map