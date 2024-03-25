import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { LocationDto } from './dto/location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) { }

  async getLocations(): Promise<LocationDto[]> {
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

  async getLocationById(id: number): Promise<LocationDto[]> {
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

  async getLocationsByParentId(parentId: number): Promise<LocationDto[]> {
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

  async createLocation(locationData: Location): Promise<Location> {
    const location = this.locationRepository.create(locationData);
    return await this.locationRepository.save(location);
  }

  async updateLocationBySubtree(idReplace: number, ids: string): Promise<void> {
    const query = `
      UPDATE "location" SET parent_id = ${idReplace}
      WHERE id IN (${ids})
    `;
    return await this.locationRepository.query(query);
  }

  async updateLocation(id: number, location: Partial<Location>): Promise<Location> {
    await this.locationRepository.update(id, location);
    return this.locationRepository.findOne({ where: { id } });
  }

  async deleteLocation(id: number): Promise<void> {
    await this.locationRepository.delete(id);
  }

  async deleteLocations(ids: string): Promise<void> {
    const query = `
      DELETE FROM "location"
      WHERE id IN (${ids})
    `;
    return await this.locationRepository.query(query);
  }

}