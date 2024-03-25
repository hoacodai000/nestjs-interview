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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const location_entity_1 = require("./location.entity");
let LocationService = class LocationService {
    constructor(locationRepository) {
        this.locationRepository = locationRepository;
    }
    async getLocations() {
        const query = `
      WITH RECURSIVE recu_locations (id, location_number, location_name, area, unit_id, parent_id, level) AS (
        SELECT l.id, l.location_number, l.location_name, l.area, l.unit_id, l.parent_id, 1 AS level
        FROM "location" l
        WHERE l.parent_id ISNULL
        UNION ALL
        SELECT l.id, l.location_number, l.location_name, l.area, l.unit_id, l.parent_id, r.level + 1
        FROM "location" l
        INNER join recu_locations r ON l.parent_id = r.id
      )
      SELECT r.id, l.location_name AS building_name, r.location_name, r.location_number, concat(r.area, ' ', u."name") as area, r.parent_id, r.level 
      FROM recu_locations r
      LEFT JOIN "location" l ON r.parent_id = l.id
      LEFT JOIN unit u ON r.unit_id = u.id
      WHERE r.parent_id NOTNULL
      ORDER BY r.level
    `;
        return await this.locationRepository.query(query);
    }
    async getLocationById(id) {
        const query = `
      SELECT  l.id,
              ll.location_name AS building_name,
              l.location_name,
              l.location_number,
              CONCAT(l.area, ' ', u.name) AS area,
              l.parent_id,
              l.unit_id
      FROM "location" l
      LEFT JOIN "location" ll ON l.parent_id  = ll.id
      LEFT JOIN unit u ON l.unit_id = u.id
      WHERE l.id = ${id}
    `;
        return await this.locationRepository.query(query);
    }
    async getLocationsByParentId(parentId) {
        const qw = parentId ? `l.parent_id = ${parentId}` : `l.parent_id isnull`;
        const query = `
      SELECT  l.id,
              ll.location_name AS building_name,
              l.location_name,
              l.location_number,
              CONCAT(l.area, ' ', u.name) AS area,
              l.parent_id,
              l.unit_id
      FROM "location" l
      LEFT JOIN "location" ll ON l.parent_id  = ll.id
      LEFT JOIN unit u ON l.unit_id = u.id
      WHERE ${qw}
    `;
        return await this.locationRepository.query(query);
    }
    async createLocation(locationData) {
        const location = this.locationRepository.create(locationData);
        return await this.locationRepository.save(location);
    }
    async updateLocationBySubtree(idReplace, ids) {
        const query = `
      UPDATE "location" SET parent_id = ${idReplace}
      WHERE id IN (${ids})
    `;
        return await this.locationRepository.query(query);
    }
    async updateLocation(id, location) {
        await this.locationRepository.update(id, location);
        return this.locationRepository.findOne({ where: { id } });
    }
    async deleteLocation(id) {
        await this.locationRepository.delete(id);
    }
    async deleteLocations(ids) {
        const query = `
      DELETE FROM "location"
      WHERE id IN (${ids})
    `;
        return await this.locationRepository.query(query);
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(location_entity_1.Location)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LocationService);
//# sourceMappingURL=location.service.js.map