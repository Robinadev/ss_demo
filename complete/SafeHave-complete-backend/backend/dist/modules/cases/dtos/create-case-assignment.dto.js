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
exports.CreateCaseAssignmentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateCaseAssignmentDto {
}
exports.CreateCaseAssignmentDto = CreateCaseAssignmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Professional/Service Provider ID',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCaseAssignmentDto.prototype, "assignedToId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of case/support needed',
        enum: client_1.CaseType,
    }),
    (0, class_validator_1.IsEnum)(client_1.CaseType),
    __metadata("design:type", String)
], CreateCaseAssignmentDto.prototype, "caseType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Case priority level',
        enum: client_1.CasePriority,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.CasePriority),
    __metadata("design:type", String)
], CreateCaseAssignmentDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional notes for the assignment',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCaseAssignmentDto.prototype, "notes", void 0);
//# sourceMappingURL=create-case-assignment.dto.js.map