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
exports.CandidatesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const candidate_schema_1 = require("./schemas/candidate.schema");
const business_exception_1 = require("../../shared/exceptions/business.exception");
let CandidatesService = class CandidatesService {
    constructor(candidateModel) {
        this.candidateModel = candidateModel;
    }
    async create(createCandidateDto) {
        const existingCandidate = await this.candidateModel.findOne({
            email: createCandidateDto.email,
        });
        if (existingCandidate) {
            throw new business_exception_1.ConflictException('Email já está em uso', {
                email: createCandidateDto.email,
            });
        }
        const normalizedSkills = createCandidateDto.skills.map(skill => skill.toLowerCase().trim());
        const candidate = new this.candidateModel({
            ...createCandidateDto,
            skills: normalizedSkills,
        });
        return candidate.save();
    }
    async findAll(query) {
        const { page = 1, limit = 10, name, email, skills, minExperience, maxExperience, isInvited, sortBy = 'createdAt', sortOrder = 'desc', } = query;
        const filter = {};
        if (name) {
            filter.name = { $regex: name, $options: 'i' };
        }
        if (email) {
            filter.email = { $regex: email, $options: 'i' };
        }
        if (skills && skills.length > 0) {
            const normalizedSkills = skills.map(skill => skill.toLowerCase().trim());
            filter.skills = { $in: normalizedSkills };
        }
        if (minExperience !== undefined || maxExperience !== undefined) {
            filter.experienceYears = {};
            if (minExperience !== undefined) {
                filter.experienceYears.$gte = minExperience;
            }
            if (maxExperience !== undefined) {
                filter.experienceYears.$lte = maxExperience;
            }
        }
        if (isInvited !== undefined) {
            filter.isInvited = isInvited;
        }
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        const skip = (page - 1) * limit;
        const [candidates, total] = await Promise.all([
            this.candidateModel
                .find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .lean()
                .exec(),
            this.candidateModel.countDocuments(filter),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            candidates,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        };
    }
    async findOne(id) {
        if (!this.isValidObjectId(id)) {
            throw new business_exception_1.ValidationException('ID inválido', { field: 'id', value: id });
        }
        const candidate = await this.candidateModel.findById(id).lean().exec();
        if (!candidate) {
            throw new business_exception_1.NotFoundException('Candidato', id);
        }
        return candidate;
    }
    async update(id, updateCandidateDto) {
        if (!this.isValidObjectId(id)) {
            throw new business_exception_1.ValidationException('ID inválido', { field: 'id', value: id });
        }
        const existingCandidate = await this.candidateModel.findById(id);
        if (!existingCandidate) {
            throw new business_exception_1.NotFoundException('Candidato', id);
        }
        if (updateCandidateDto.email && updateCandidateDto.email !== existingCandidate.email) {
            const emailExists = await this.candidateModel.findOne({
                email: updateCandidateDto.email,
                _id: { $ne: id },
            });
            if (emailExists) {
                throw new business_exception_1.ConflictException('Email já está em uso', {
                    email: updateCandidateDto.email,
                });
            }
        }
        if (updateCandidateDto.skills) {
            updateCandidateDto.skills = updateCandidateDto.skills.map(skill => skill.toLowerCase().trim());
        }
        const updatedCandidate = await this.candidateModel
            .findByIdAndUpdate(id, updateCandidateDto, { new: true })
            .lean()
            .exec();
        return updatedCandidate;
    }
    async remove(id) {
        if (!this.isValidObjectId(id)) {
            throw new business_exception_1.ValidationException('ID inválido', { field: 'id', value: id });
        }
        const candidate = await this.candidateModel.findByIdAndDelete(id);
        if (!candidate) {
            throw new business_exception_1.NotFoundException('Candidato', id);
        }
        return {
            id,
            message: 'Candidato removido com sucesso',
        };
    }
    async inviteCandidate(id) {
        if (!this.isValidObjectId(id)) {
            throw new business_exception_1.ValidationException('ID inválido', { field: 'id', value: id });
        }
        const candidate = await this.candidateModel.findByIdAndUpdate(id, { isInvited: true }, { new: true }).lean().exec();
        if (!candidate) {
            throw new business_exception_1.NotFoundException('Candidato', id);
        }
        return candidate;
    }
    async uninviteCandidate(id) {
        if (!this.isValidObjectId(id)) {
            throw new business_exception_1.ValidationException('ID inválido', { field: 'id', value: id });
        }
        const candidate = await this.candidateModel.findByIdAndUpdate(id, { isInvited: false }, { new: true }).lean().exec();
        if (!candidate) {
            throw new business_exception_1.NotFoundException('Candidato', id);
        }
        return candidate;
    }
    isValidObjectId(id) {
        return /^[0-9a-fA-F]{24}$/.test(id);
    }
};
exports.CandidatesService = CandidatesService;
exports.CandidatesService = CandidatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(candidate_schema_1.Candidate.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CandidatesService);
//# sourceMappingURL=candidates.service.js.map