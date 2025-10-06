"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const request = require("supertest");
const candidates_controller_1 = require("../../src/modules/candidates/candidates.controller");
const candidates_service_1 = require("../../src/modules/candidates/candidates.service");
const candidate_schema_1 = require("../../src/modules/candidates/schemas/candidate.schema");
const candidate_mocks_1 = require("../utils/candidate-mocks");
describe('Candidates Integration Tests', () => {
    let app;
    let candidateModel;
    beforeAll(async () => {
        const MockCandidateConstructor = (0, candidate_mocks_1.createMockCandidateModel)();
        const moduleFixture = await testing_1.Test.createTestingModule({
            controllers: [candidates_controller_1.CandidatesController],
            providers: [
                candidates_service_1.CandidatesService,
                {
                    provide: (0, mongoose_1.getModelToken)(candidate_schema_1.Candidate.name),
                    useValue: MockCandidateConstructor,
                },
            ],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe());
        await app.init();
        candidateModel = moduleFixture.get((0, mongoose_1.getModelToken)(candidate_schema_1.Candidate.name));
    });
    afterAll(async () => {
        await app.close();
    });
    describe('POST /candidates', () => {
        it('should create a new candidate successfully', async () => {
            const validCreateDto = {
                name: 'João Silva',
                email: 'joao@email.com',
                skills: ['JavaScript', 'Node.js', 'React'],
                experienceYears: 3,
            };
            candidateModel.findOne.mockResolvedValue(null);
            const response = await request(app.getHttpServer())
                .post('/candidates')
                .send(validCreateDto)
                .expect(201);
            expect(response.body).toEqual({
                success: true,
                message: 'Candidato criado com sucesso',
                data: {
                    _id: '507f1f77bcf86cd799439011',
                    ...validCreateDto,
                    skills: ['javascript', 'node.js', 'react'],
                },
            });
        });
        it('should return 409 when email already exists', async () => {
            const validCreateDto = {
                name: 'João Silva',
                email: 'joao@email.com',
                skills: ['JavaScript', 'Node.js'],
                experienceYears: 3,
            };
            candidateModel.findOne.mockResolvedValue(candidate_mocks_1.mockCandidate);
            await request(app.getHttpServer())
                .post('/candidates')
                .send(validCreateDto)
                .expect(409);
        });
        it('should return 400 for invalid data', async () => {
            const invalidCreateDto = {
                name: '',
                email: 'invalid-email',
                skills: [],
                experienceYears: -1,
            };
            await request(app.getHttpServer())
                .post('/candidates')
                .send(invalidCreateDto)
                .expect(400);
        });
        it('should validate required fields', async () => {
            const invalidCreateDto = {
                name: 'João Silva',
            };
            await request(app.getHttpServer())
                .post('/candidates')
                .send(invalidCreateDto)
                .expect(400);
        });
    });
    describe('GET /candidates', () => {
        it('should return paginated candidates', async () => {
            const mockCount = 1;
            candidateModel.find.mockReturnValue({
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
                sort: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(candidate_mocks_1.mockCandidates),
            });
            candidateModel.countDocuments.mockResolvedValue(mockCount);
            const response = await request(app.getHttpServer())
                .get('/candidates')
                .expect(200);
            expect(response.body).toEqual({
                success: true,
                data: {
                    candidates: candidate_mocks_1.mockCandidates,
                    pagination: {
                        page: 1,
                        limit: 10,
                        total: mockCount,
                        totalPages: 1,
                    },
                },
            });
        });
        it('should filter candidates by name', async () => {
            const mockCount = 1;
            candidateModel.find.mockReturnValue({
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
                sort: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(candidate_mocks_1.mockCandidates),
            });
            candidateModel.countDocuments.mockResolvedValue(mockCount);
            await request(app.getHttpServer())
                .get('/candidates?name=João')
                .expect(200);
            expect(candidateModel.find).toHaveBeenCalledWith({
                name: { $regex: 'João', $options: 'i' },
            });
        });
        it('should filter candidates by skills', async () => {
            const mockCount = 1;
            candidateModel.find.mockReturnValue({
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
                sort: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(candidate_mocks_1.mockCandidates),
            });
            candidateModel.countDocuments.mockResolvedValue(mockCount);
            await request(app.getHttpServer())
                .get('/candidates?skills=javascript,react')
                .expect(200);
            expect(candidateModel.find).toHaveBeenCalledWith({
                skills: { $in: ['javascript', 'react'] },
            });
        });
    });
    describe('GET /candidates/:id', () => {
        it('should return a candidate by id', async () => {
            const candidateId = '507f1f77bcf86cd799439011';
            candidateModel.findById.mockResolvedValue(candidate_mocks_1.mockCandidate);
            const response = await request(app.getHttpServer())
                .get(`/candidates/${candidateId}`)
                .expect(200);
            expect(response.body).toEqual({
                success: true,
                data: candidate_mocks_1.mockCandidate,
            });
        });
        it('should return 404 when candidate not found', async () => {
            const candidateId = '507f1f77bcf86cd799439011';
            candidateModel.findById.mockResolvedValue(null);
            await request(app.getHttpServer())
                .get(`/candidates/${candidateId}`)
                .expect(404);
        });
        it('should return 400 for invalid id', async () => {
            const invalidId = 'invalid-id';
            await request(app.getHttpServer())
                .get(`/candidates/${invalidId}`)
                .expect(400);
        });
    });
    describe('PATCH /candidates/:id', () => {
        it('should update a candidate successfully', async () => {
            const candidateId = '507f1f77bcf86cd799439011';
            const updateDto = {
                name: 'João Silva Santos',
                skills: ['JavaScript', 'Node.js', 'React', 'TypeScript'],
            };
            const updatedCandidate = {
                ...candidate_mocks_1.mockCandidate,
                name: 'João Silva Santos',
                skills: ['javascript', 'node.js', 'react', 'typescript'],
            };
            candidateModel.findByIdAndUpdate.mockResolvedValue(updatedCandidate);
            const response = await request(app.getHttpServer())
                .patch(`/candidates/${candidateId}`)
                .send(updateDto)
                .expect(200);
            expect(response.body).toEqual({
                success: true,
                message: 'Candidato atualizado com sucesso',
                data: updatedCandidate,
            });
        });
        it('should return 404 when candidate not found', async () => {
            const candidateId = '507f1f77bcf86cd799439011';
            const updateDto = {
                name: 'João Silva Santos',
            };
            candidateModel.findByIdAndUpdate.mockResolvedValue(null);
            await request(app.getHttpServer())
                .patch(`/candidates/${candidateId}`)
                .send(updateDto)
                .expect(404);
        });
        it('should return 400 for invalid id', async () => {
            const invalidId = 'invalid-id';
            const updateDto = {
                name: 'João Silva Santos',
            };
            await request(app.getHttpServer())
                .patch(`/candidates/${invalidId}`)
                .send(updateDto)
                .expect(400);
        });
    });
    describe('DELETE /candidates/:id', () => {
        it('should delete a candidate successfully', async () => {
            const candidateId = '507f1f77bcf86cd799439011';
            candidateModel.findByIdAndDelete.mockResolvedValue(candidate_mocks_1.mockCandidate);
            const response = await request(app.getHttpServer())
                .delete(`/candidates/${candidateId}`)
                .expect(200);
            expect(response.body).toEqual({
                success: true,
                message: 'Candidato removido com sucesso',
                data: { id: candidateId },
            });
        });
        it('should return 404 when candidate not found', async () => {
            const candidateId = '507f1f77bcf86cd799439011';
            candidateModel.findByIdAndDelete.mockResolvedValue(null);
            await request(app.getHttpServer())
                .delete(`/candidates/${candidateId}`)
                .expect(404);
        });
        it('should return 400 for invalid id', async () => {
            const invalidId = 'invalid-id';
            await request(app.getHttpServer())
                .delete(`/candidates/${invalidId}`)
                .expect(400);
        });
    });
    describe('POST /candidates/:id/invite', () => {
        it('should invite a candidate successfully', async () => {
            const candidateId = '507f1f77bcf86cd799439011';
            const invitedCandidate = {
                ...candidate_mocks_1.mockCandidate,
                isInvited: true,
            };
            candidateModel.findByIdAndUpdate.mockResolvedValue(invitedCandidate);
            const response = await request(app.getHttpServer())
                .post(`/candidates/${candidateId}/invite`)
                .expect(200);
            expect(response.body).toEqual({
                success: true,
                message: 'Candidato convidado com sucesso',
                data: invitedCandidate,
            });
        });
        it('should return 404 when candidate not found', async () => {
            const candidateId = '507f1f77bcf86cd799439011';
            candidateModel.findByIdAndUpdate.mockResolvedValue(null);
            await request(app.getHttpServer())
                .post(`/candidates/${candidateId}/invite`)
                .expect(404);
        });
        it('should return 400 for invalid id', async () => {
            const invalidId = 'invalid-id';
            await request(app.getHttpServer())
                .post(`/candidates/${invalidId}/invite`)
                .expect(400);
        });
    });
    describe('POST /candidates/:id/uninvite', () => {
        it('should uninvite a candidate successfully', async () => {
            const candidateId = '507f1f77bcf86cd799439011';
            const uninvitedCandidate = {
                ...candidate_mocks_1.mockCandidate,
                isInvited: false,
            };
            candidateModel.findByIdAndUpdate.mockResolvedValue(uninvitedCandidate);
            const response = await request(app.getHttpServer())
                .post(`/candidates/${candidateId}/uninvite`)
                .expect(200);
            expect(response.body).toEqual({
                success: true,
                message: 'Convite cancelado com sucesso',
                data: uninvitedCandidate,
            });
        });
        it('should return 404 when candidate not found', async () => {
            const candidateId = '507f1f77bcf86cd799439011';
            candidateModel.findByIdAndUpdate.mockResolvedValue(null);
            await request(app.getHttpServer())
                .post(`/candidates/${candidateId}/uninvite`)
                .expect(404);
        });
        it('should return 400 for invalid id', async () => {
            const invalidId = 'invalid-id';
            await request(app.getHttpServer())
                .post(`/candidates/${invalidId}/uninvite`)
                .expect(400);
        });
    });
});
//# sourceMappingURL=candidates.integration.spec.js.map