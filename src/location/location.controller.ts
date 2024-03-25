import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, InternalServerErrorException, UseFilters } from '@nestjs/common';

import { LocationService } from './location.service';
import { Location } from './location.entity';
import { DatabaseExceptionFilter } from '../common/exceptions/database-exception.filter';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationDto } from './dto/location.dto';
import { findLocationsOfNode } from './location';
import { ResponseData } from '../common/models/response';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Get()
  async getLocations(): Promise<ResponseData<LocationDto[]>> {
    try {
      const res = await this.locationService.getLocations();
      return ResponseData.getSuccessData(res);
    } catch (error) {
      throw new InternalServerErrorException('Failed to get locations');
    }
  }

  @Get(':id')
  // @UseFilters(new DatabaseExceptionFilter())
  async getLocationById(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<LocationDto>> {
    const [dt] = await this.locationService.getLocationById(id);
    if (!dt) {
      throw new NotFoundException('Location does not exist!');
    } else {
      return ResponseData.getSuccessData(dt);
    }
  }

  @Get('build/:parentId')
  // @UseFilters(new DatabaseExceptionFilter())
  async getLocationsByParentId(@Param('parentId', ParseIntPipe) parentId: number): Promise<ResponseData<LocationDto[]>> {
    try {
      const res = await this.locationService.getLocationsByParentId(parentId);
      return ResponseData.getSuccessData(res);
    } catch (error) {
      throw new InternalServerErrorException('Failed to get locations');
    }
  }

  @Post()
  async createLocation(@Body() createLocationDto: CreateLocationDto): Promise<ResponseData<Location>> {
    const [dt] = await this.locationService.getLocationsByParentId(createLocationDto.parent_id);
    if (!dt && createLocationDto.parent_id) {
      throw new NotFoundException('Parent location does not exist!');
    }

    if (dt && createLocationDto.parent_id == null) {
      throw new NotFoundException('Failed to create parent location!');
    }

    try {
      const { location_number, location_name, area, unit_id, parent_id } = createLocationDto;
      const location = new Location();
      location.location_name = location_name;
      location.location_number = location_number;
      location.area = area;
      location.unit_id = unit_id;
      location.parent_id = parent_id;

      const res = await this.locationService.createLocation(location);
      return ResponseData.getSuccessData(res);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create location');
    }
  }

  @Put('build/:id')
  async updateLocationBySubtree(@Param('id', ParseIntPipe) id: number, @Body() idReplace: number): Promise<ResponseData<LocationDto[]>> {
    const [dt] = await this.locationService.getLocationById(id);
    if (!dt) {
      throw new NotFoundException('Location does not exist!');
    }

    const [dtr] = await this.locationService.getLocationById(idReplace);
    if (!dtr) {
      throw new NotFoundException('Location does not exist!');
    }

    const dtp = await this.locationService.getLocationsByParentId(id);
    if (!dtp || !dtp.length) {
      throw new NotFoundException('List parent location does not exist!');
    }

    try {
      const ids = dtp.map((p: LocationDto) => p.id).join(',');
      await this.locationService.updateLocationBySubtree(idReplace, ids);

      const res = await this.locationService.getLocationsByParentId(id);
      return ResponseData.getSuccessData(res);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update location by tree');
    }
  }

  @Put(':id')
  async updateLocation(@Param('id', ParseIntPipe) id: number, @Body() locationData: UpdateLocationDto): Promise<ResponseData<Location>> {
    const [dt] = await this.locationService.getLocationById(id);
    if (!dt) {
      throw new NotFoundException('Location does not exist!');
    }

    const [dtp] = await this.locationService.getLocationsByParentId(locationData.parent_id);
    if (!dtp && locationData.parent_id) {
      throw new NotFoundException('Parent location does not exist!');
    }
    if (dtp && locationData.parent_id == null) {
      throw new NotFoundException('Failed to update parent location!');
    }

    try {
      const res = await this.locationService.updateLocation(id, locationData);
      return ResponseData.getSuccessData(res);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update location');
    }
  }

  @Delete('build/:id')
  async deleteLocationAndSubtree(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<{}>> {
    const [dt] = await this.locationService.getLocationById(id);
    if (!dt) {
      throw new NotFoundException('Location does not exist!');
    }

    const locations = await this.locationService.getLocations();
    const data = findLocationsOfNode(+id, locations);

    try {
      if (data && data.length) {
        const ids = (data.map(p => p.id)).concat([+id]).join(',');
        await this.locationService.deleteLocations(ids);
      } else {
        await this.locationService.deleteLocation(id);
      }
      return ResponseData.getSuccessData({});
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete location and tree');
    }
  }

  @Delete(':id')
  async deleteLocation(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<{}>> {
    const [dt] = await this.locationService.getLocationById(id);
    if (!dt) {
      throw new NotFoundException('Location does not exist!');
    }

    try {
      await this.locationService.deleteLocation(id);
      return ResponseData.getSuccessData({});
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete location');
    }
  }
}