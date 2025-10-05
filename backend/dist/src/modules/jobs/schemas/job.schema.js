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
exports.JobSchema = exports.Job = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Job = class Job {
};
exports.Job = Job;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, maxlength: 100 }),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, minlength: 10, maxlength: 2000 }),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, maxlength: 100 }),
    __metadata("design:type", String)
], Job.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, maxlength: 50 }),
    __metadata("design:type", String)
], Job.prototype, "salaryRange", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        required: true,
        validate: {
            validator: function (skills) {
                return skills.length > 0 && skills.length <= 20;
            },
            message: 'Pelo menos uma skill é obrigatória e máximo 20 skills permitidas',
        },
    }),
    __metadata("design:type", Array)
], Job.prototype, "skills", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Job.prototype, "createdAt", void 0);
exports.Job = Job = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false })
], Job);
exports.JobSchema = mongoose_1.SchemaFactory.createForClass(Job);
exports.JobSchema.index({ title: 'text', description: 'text', location: 'text' });
exports.JobSchema.index({ skills: 1 });
exports.JobSchema.index({ createdAt: -1 });
exports.JobSchema.pre('save', function (next) {
    this.skills = [...new Set(this.skills.map(skill => skill.trim().toLowerCase()))];
    next();
});
//# sourceMappingURL=job.schema.js.map