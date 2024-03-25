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
exports.UnitController = void 0;
const common_1 = require("@nestjs/common");
const unit_service_1 = require("./unit.service");
const unit_entity_1 = require("./unit.entity");
const create_unit_dto_1 = require("./dto/create-unit.dto");
const update_unit_dto_1 = require("./dto/update-unit.dto");
const response_1 = require("../common/models/response");
const parse_int_pipe_1 = require("../common/pipes/parse-int.pipe");
let UnitController = class UnitController {
    constructor(unitService) {
        this.unitService = unitService;
    }
    async getUnits() {
        try {
            const res = await this.unitService.getUnits();
            return response_1.ResponseData.getSuccessData(res);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to get units');
        }
    }
    async getUnitById(id) {
        const res = await this.unitService.getUnitById(id);
        if (!res) {
            throw new common_1.NotFoundException('Unit does not exist!');
        }
        else {
            return response_1.ResponseData.getSuccessData(res);
        }
    }
    async createUnit(createUnitDto) {
        try {
            const { unit_code, name } = createUnitDto;
            const unit = new unit_entity_1.Unit();
            unit.unit_code = unit_code;
            unit.name = name;
            const res = await this.unitService.createUnit(unit);
            return response_1.ResponseData.getSuccessData(res);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create unit');
        }
    }
    async updateUnit(id, unitData) {
        const unit = await this.unitService.getUnitById(id);
        if (!unit) {
            throw new common_1.NotFoundException('Unit does not exist!');
        }
        try {
            const res = await this.unitService.updateUnit(id, unitData);
            return response_1.ResponseData.getSuccessData(res);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update unit');
        }
    }
    async deleteUnit(id) {
        const unit = await this.unitService.getUnitById(id);
        if (!unit) {
            throw new common_1.NotFoundException('Unit does not exist!');
        }
        try {
            await this.unitService.deleteUnit(id);
            return response_1.ResponseData.getSuccessData({});
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete unit');
        }
    }
};
exports.UnitController = UnitController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "getUnits", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "getUnitById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_unit_dto_1.CreateUnitDto]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "createUnit", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_unit_dto_1.UpdateUnitDto]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "updateUnit", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "deleteUnit", null);
exports.UnitController = UnitController = __decorate([
    (0, common_1.Controller)('units'),
    __metadata("design:paramtypes", [unit_service_1.UnitService])
], UnitController);
//# sourceMappingURL=unit.controller.js.map