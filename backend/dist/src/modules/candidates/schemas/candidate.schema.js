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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateSchema = exports.Candidate = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Candidate = class Candidate {
};
exports.Candidate = Candidate;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, maxlength: 100 }),
    __metadata("design:type", String)
], Candidate.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, trim: true, lowercase: true }),
    __metadata("design:type", String)
], Candidate.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        required: true,
        validate: {
            validator: function (skills) {
                return skills.length > 0;
            },
            message: 'Pelo menos uma skill é obrigatória',
        },
    }),
    __metadata("design:type", Array)
], Candidate.prototype, "skills", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, max: 50 }),
    __metadata("design:type", Number)
], Candidate.prototype, "experienceYears", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Candidate.prototype, "isInvited", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Candidate.prototype, "createdAt", void 0);
exports.Candidate = Candidate = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false })
], Candidate);
exports.CandidateSchema = mongoose_1.SchemaFactory.createForClass(Candidate);
exports.CandidateSchema.index({ skills: 1 });
exports.CandidateSchema.index({ experienceYears: 1 });
exports.CandidateSchema.index({ isInvited: 1 });
exports.CandidateSchema.pre('save', function (next) {
    this.skills = [...new Set(this.skills.map(skill => skill.trim().toLowerCase()))];
    next();
});
//# sourceMappingURL=candidate.schema.js.map