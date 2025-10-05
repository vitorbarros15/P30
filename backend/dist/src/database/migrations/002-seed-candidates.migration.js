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
exports.SeedCandidatesMigration = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const candidate_schema_1 = require("../../modules/candidates/schemas/candidate.schema");
const fs = require("fs");
const path = require("path");
let SeedCandidatesMigration = class SeedCandidatesMigration {
    constructor(candidateModel) {
        this.candidateModel = candidateModel;
        this.name = '002-seed-candidates';
        this.version = 2;
        this.description = 'Seed candidates from JSON file';
    }
    async up() {
        try {
            const existingCandidates = await this.candidateModel.countDocuments();
            if (existingCandidates === 0) {
                const seedPath = path.join(process.cwd(), 'seeds', 'candidates.seed.json');
                if (fs.existsSync(seedPath)) {
                    const candidatesData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
                    await this.candidateModel.insertMany(candidatesData);
                    console.log(`Seeded ${candidatesData.length} candidates`);
                }
                else {
                    console.log('Candidates seed file not found');
                }
            }
            else {
                console.log(`${existingCandidates} candidates already exist`);
            }
        }
        catch (error) {
            console.error('Error seeding candidates:', error);
            throw error;
        }
    }
    async down() {
        await this.candidateModel.deleteMany({});
        console.log('🗑️  All candidates removed');
    }
};
exports.SeedCandidatesMigration = SeedCandidatesMigration;
exports.SeedCandidatesMigration = SeedCandidatesMigration = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(candidate_schema_1.Candidate.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SeedCandidatesMigration);
//# sourceMappingURL=002-seed-candidates.migration.js.map