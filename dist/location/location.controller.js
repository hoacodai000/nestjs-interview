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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const location_service_1 = require("./location.service");
const location_entity_1 = require("./location.entity");
const create_location_dto_1 = require("./dto/create-location.dto");
const update_location_dto_1 = require("./dto/update-location.dto");
const location_1 = require("./location");
const response_1 = require("../common/models/response");
const parse_int_pipe_1 = require("../common/pipes/parse-int.pipe");
let LocationController = class LocationController {
    constructor(locationService) {
        this.locationService = locationService;
    }
    async getLocations() {
        try {
            const res = await this.locationService.getLocations();
            return response_1.ResponseData.getSuccessData(res);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to get locations');
        }
    }
    async getLocationById(id) {
        const [dt] = await this.locationService.getLocationById(id);
        if (!dt) {
            throw new common_1.NotFoundException('Location does not exist!');
        }
        else {
            return response_1.ResponseData.getSuccessData(dt);
        }
    }
    async getLocationsByParentId(parentId) {
        try {
            const res = await this.locationService.getLocationsByParentId(parentId);
            return response_1.ResponseData.getSuccessData(res);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to get locations');
        }
    }
    async createLocation(createLocationDto) {
        const [dt] = await this.locationService.getLocationsByParentId(createLocationDto.parent_id);
        if (!dt && createLocationDto.parent_id) {
            throw new common_1.NotFoundException('Parent location does not exist!');
        }
        if (dt && createLocationDto.parent_id == null) {
            throw new common_1.NotFoundException('Failed to create parent location!');
        }
        try {
            const { location_number, location_name, area, unit_id, parent_id } = createLocationDto;
            const location = new location_entity_1.Location();
            location.location_name = location_name;
            location.location_number = location_number;
            location.area = area;
            location.unit_id = unit_id;
            location.parent_id = parent_id;
            const res = await this.locationService.createLocation(location);
            return response_1.ResponseData.getSuccessData(res);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create location');
        }
    }
    async updateLocationBySubtree(id, idReplace) {
        const [dt] = await this.locationService.getLocationById(id);
        if (!dt) {
            throw new common_1.NotFoundException('Location does not exist!');
        }
        const [dtr] = await this.locationService.getLocationById(idReplace);
        if (!dtr) {
            throw new common_1.NotFoundException('Location does not exist!');
        }
        const dtp = await this.locationService.getLocationsByParentId(id);
        if (!dtp || !dtp.length) {
            throw new common_1.NotFoundException('List parent location does not exist!');
        }
        try {
            const ids = dtp.map((p) => p.id).join(',');
            await this.locationService.updateLocationBySubtree(idReplace, ids);
            const res = await this.locationService.getLocationsByParentId(id);
            return response_1.ResponseData.getSuccessData(res);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update location by tree');
        }
    }
    async updateLocation(id, locationData) {
        const [dt] = await this.locationService.getLocationById(id);
        if (!dt) {
            throw new common_1.NotFoundException('Location does not exist!');
        }
        const [dtp] = await this.locationService.getLocationsByParentId(locationData.parent_id);
        if (!dtp && locationData.parent_id) {
            throw new common_1.NotFoundException('Parent location does not exist!');
        }
        if (dtp && locationData.parent_id == null) {
            throw new common_1.NotFoundException('Failed to update parent location!');
        }
        try {
            const res = await this.locationService.updateLocation(id, locationData);
            return response_1.ResponseData.getSuccessData(res);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update location');
        }
    }
    async deleteLocationAndSubtree(id) {
        const [dt] = await this.locationService.getLocationById(id);
        if (!dt) {
            throw new common_1.NotFoundException('Location does not exist!');
        }
        const locations = await this.locationService.getLocations();
        const data = (0, location_1.findLocationsOfNode)(+id, locations);
        try {
            if (data && data.length) {
                const ids = (data.map(p => p.id)).concat([+id]).join(',');
                await this.locationService.deleteLocations(ids);
            }
            else {
                await this.locationService.deleteLocation(id);
            }
            return response_1.ResponseData.getSuccessData({});
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete location and tree');
        }
    }
    async deleteLocation(id) {
        const [dt] = await this.locationService.getLocationById(id);
        if (!dt) {
            throw new common_1.NotFoundException('Location does not exist!');
        }
        try {
            await this.locationService.deleteLocation(id);
            return response_1.ResponseData.getSuccessData({});
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete location');
        }
    }
};
exports.LocationController = LocationController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getLocations", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getLocationById", null);
__decorate([
    (0, common_1.Get)('build/:parentId'),
    __param(0, (0, common_1.Param)('parentId', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getLocationsByParentId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_location_dto_1.CreateLocationDto]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "createLocation", null);
__decorate([
    (0, common_1.Put)('build/:id'),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "updateLocationBySubtree", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_location_dto_1.UpdateLocationDto]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "updateLocation", null);
__decorate([
    (0, common_1.Delete)('build/:id'),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "deleteLocationAndSubtree", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "deleteLocation", null);
exports.LocationController = LocationController = __decorate([
    (0, common_1.Controller)('locations'),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationController);
//# sourceMappingURL=location.controller.js.map