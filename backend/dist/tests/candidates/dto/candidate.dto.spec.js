"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const create_candidate_dto_1 = require("../../../src/modules/candidates/dto/create-candidate.dto");
const update_candidate_dto_1 = require("../../../src/modules/candidates/dto/update-candidate.dto");
const candidate_query_dto_1 = require("../../../src/modules/candidates/dto/candidate-query.dto");
describe('Candidate DTOs', () => {
    describe('CreateCandidateDto', () => {
        it('should validate a valid create candidate DTO', async () => {
            const validDto = new create_candidate_dto_1.CreateCandidateDto();
            validDto.name = 'João Silva';
            validDto.email = 'joao@email.com';
            validDto.skills = ['JavaScript', 'Node.js', 'React'];
            validDto.experienceYears = 3;
            const errors = await (0, class_validator_1.validate)(validDto);
            expect(errors).toHaveLength(0);
        });
        it('should fail validation with empty name', async () => {
            const invalidDto = new create_candidate_dto_1.CreateCandidateDto();
            invalidDto.name = '';
            invalidDto.email = 'joao@email.com';
            invalidDto.skills = ['JavaScript'];
            invalidDto.experienceYears = 3;
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('name');
        });
        it('should fail validation with name too short', async () => {
            const invalidDto = new create_candidate_dto_1.CreateCandidateDto();
            invalidDto.name = 'Jo';
            invalidDto.email = 'joao@email.com';
            invalidDto.skills = ['JavaScript'];
            invalidDto.experienceYears = 3;
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('name');
        });
        it('should fail validation with name too long', async () => {
            const invalidDto = new create_candidate_dto_1.CreateCandidateDto();
            invalidDto.name = 'A'.repeat(101);
            invalidDto.email = 'joao@email.com';
            invalidDto.skills = ['JavaScript'];
            invalidDto.experienceYears = 3;
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('name');
        });
        it('should fail validation with invalid email', async () => {
            const invalidDto = new create_candidate_dto_1.CreateCandidateDto();
            invalidDto.name = 'João Silva';
            invalidDto.email = 'invalid-email';
            invalidDto.skills = ['JavaScript'];
            invalidDto.experienceYears = 3;
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('email');
        });
        it('should fail validation with empty skills array', async () => {
            const invalidDto = new create_candidate_dto_1.CreateCandidateDto();
            invalidDto.name = 'João Silva';
            invalidDto.email = 'joao@email.com';
            invalidDto.skills = [];
            invalidDto.experienceYears = 3;
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('skills');
        });
        it('should fail validation with negative experience years', async () => {
            const invalidDto = new create_candidate_dto_1.CreateCandidateDto();
            invalidDto.name = 'João Silva';
            invalidDto.email = 'joao@email.com';
            invalidDto.skills = ['JavaScript'];
            invalidDto.experienceYears = -1;
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('experienceYears');
        });
        it('should fail validation with missing required fields', async () => {
            const invalidDto = new create_candidate_dto_1.CreateCandidateDto();
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors.length).toBeGreaterThan(0);
        });
    });
    describe('UpdateCandidateDto', () => {
        it('should validate a valid update candidate DTO', async () => {
            const validDto = new update_candidate_dto_1.UpdateCandidateDto();
            validDto.name = 'João Silva Santos';
            validDto.skills = ['JavaScript', 'Node.js', 'React', 'TypeScript'];
            const errors = await (0, class_validator_1.validate)(validDto);
            expect(errors).toHaveLength(0);
        });
        it('should validate with partial data', async () => {
            const validDto = new update_candidate_dto_1.UpdateCandidateDto();
            validDto.name = 'João Silva Santos';
            const errors = await (0, class_validator_1.validate)(validDto);
            expect(errors).toHaveLength(0);
        });
        it('should fail validation with name too short', async () => {
            const invalidDto = new update_candidate_dto_1.UpdateCandidateDto();
            invalidDto.name = 'Jo';
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('name');
        });
        it('should fail validation with name too long', async () => {
            const invalidDto = new update_candidate_dto_1.UpdateCandidateDto();
            invalidDto.name = 'A'.repeat(101);
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('name');
        });
        it('should fail validation with empty skills array', async () => {
            const invalidDto = new update_candidate_dto_1.UpdateCandidateDto();
            invalidDto.skills = [];
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('skills');
        });
        it('should fail validation with negative experience years', async () => {
            const invalidDto = new update_candidate_dto_1.UpdateCandidateDto();
            invalidDto.experienceYears = -1;
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('experienceYears');
        });
    });
    describe('CandidateQueryDto', () => {
        it('should validate a valid query DTO', async () => {
            const validDto = new candidate_query_dto_1.CandidateQueryDto();
            validDto.page = 1;
            validDto.limit = 10;
            validDto.name = 'João';
            validDto.email = 'joao@email.com';
            validDto.skills = ['javascript', 'react'];
            validDto.minExperience = 2;
            validDto.maxExperience = 5;
            validDto.isInvited = true;
            const errors = await (0, class_validator_1.validate)(validDto);
            expect(errors).toHaveLength(0);
        });
        it('should validate with default values', async () => {
            const validDto = new candidate_query_dto_1.CandidateQueryDto();
            const errors = await (0, class_validator_1.validate)(validDto);
            expect(errors).toHaveLength(0);
        });
        it('should fail validation with negative page', async () => {
            const invalidDto = new candidate_query_dto_1.CandidateQueryDto();
            invalidDto.page = -1;
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('page');
        });
        it('should fail validation with zero limit', async () => {
            const invalidDto = new candidate_query_dto_1.CandidateQueryDto();
            invalidDto.limit = 0;
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('limit');
        });
        it('should fail validation with limit too high', async () => {
            const invalidDto = new candidate_query_dto_1.CandidateQueryDto();
            invalidDto.limit = 101;
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('limit');
        });
        it('should fail validation with invalid email', async () => {
            const invalidDto = new candidate_query_dto_1.CandidateQueryDto();
            invalidDto.email = 'invalid-email';
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('email');
        });
        it('should fail validation with negative min experience', async () => {
            const invalidDto = new candidate_query_dto_1.CandidateQueryDto();
            invalidDto.minExperience = -1;
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('minExperience');
        });
        it('should fail validation with negative max experience', async () => {
            const invalidDto = new candidate_query_dto_1.CandidateQueryDto();
            invalidDto.maxExperience = -1;
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('maxExperience');
        });
        it('should fail validation when min experience is greater than max experience', async () => {
            const invalidDto = new candidate_query_dto_1.CandidateQueryDto();
            invalidDto.minExperience = 5;
            invalidDto.maxExperience = 2;
            const errors = await (0, class_validator_1.validate)(invalidDto);
            expect(errors).toHaveLength(1);
            expect(errors[0].property).toBe('maxExperience');
        });
    });
});
//# sourceMappingURL=candidate.dto.spec.js.map