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
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const business_exception_1 = require("../../shared/exceptions/business.exception");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const job_schema_1 = require("./schemas/job.schema");
const common_2 = require("@nestjs/common");
let JobsService = class JobsService {
    constructor(jobModel) {
        this.jobModel = jobModel;
    }
    async create(createJobDto) {
        try {
            const createdJob = new this.jobModel(createJobDto);
            return await createdJob.save();
        }
        catch (error) {
            throw new common_2.BadRequestException('Erro ao criar vaga: ' + error.message);
        }
    }
    async findAll(query) {
        const { page = 1, limit = 10, search } = query;
        const skip = (page - 1) * limit;
        const filter = {};
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { skills: { $in: [new RegExp(search, 'i')] } },
            ];
        }
        const [jobs, total] = await Promise.all([
            this.jobModel
                .find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean()
                .exec(),
            this.jobModel.countDocuments(filter),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            jobs,
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
        const job = await this.jobModel.findById(id).lean().exec();
        if (!job) {
            throw new business_exception_1.NotFoundException('Vaga', id);
        }
        return job;
    }
    async update(id, updateJobDto) {
        if (!this.isValidObjectId(id)) {
            throw new common_2.BadRequestException('ID inválido');
        }
        const updatedJob = await this.jobModel
            .findByIdAndUpdate(id, updateJobDto, { new: true, runValidators: true })
            .lean()
            .exec();
        if (!updatedJob) {
            throw new business_exception_1.NotFoundException('Vaga não encontrada');
        }
        return updatedJob;
    }
    async remove(id) {
        if (!this.isValidObjectId(id)) {
            throw new common_2.BadRequestException('ID inválido');
        }
        const deletedJob = await this.jobModel.findByIdAndDelete(id).lean().exec();
        if (!deletedJob) {
            throw new business_exception_1.NotFoundException('Vaga não encontrada');
        }
        return { id, message: 'Vaga deletada com sucesso' };
    }
    isValidObjectId(id) {
        return /^[0-9a-fA-F]{24}$/.test(id);
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(job_schema_1.Job.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], JobsService);
//# sourceMappingURL=jobs.service.js.map