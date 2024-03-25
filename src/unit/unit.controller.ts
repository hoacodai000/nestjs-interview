import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, InternalServerErrorException, UseFilters } from '@nestjs/common';
import { UnitService } from './unit.service';
import { Unit } from './unit.entity';
import { DatabaseExceptionFilter } from '../common/exceptions/database-exception.filter';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { ResponseData } from '../common/models/response';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';

@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) { }

  @Get()
  async getUnits(): Promise<ResponseData<Unit[]>> {
    try {
      const res = await this.unitService.getUnits();
      return ResponseData.getSuccessData(res);
    } catch (error) {
      throw new InternalServerErrorException('Failed to get units');
    }
  }

  @Get(':id')
  // @UseFilters(new DatabaseExceptionFilter())
  async getUnitById(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<Unit>> {
    const res = await this.unitService.getUnitById(id);
    if (!res) {
      throw new NotFoundException('Unit does not exist!');
    } else {
      return ResponseData.getSuccessData(res);
    }
  }

  @Post()
  async createUnit(@Body() createUnitDto: CreateUnitDto): Promise<ResponseData<Unit>> {
    try {
      const { unit_code, name } = createUnitDto;
      const unit = new Unit();
      unit.unit_code = unit_code;
      unit.name = name;

      const res = await this.unitService.createUnit(unit);
      return ResponseData.getSuccessData(res);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create unit');
    }
  }

  @Put(':id')
  async updateUnit(@Param('id', ParseIntPipe) id: number, @Body() unitData: UpdateUnitDto): Promise<ResponseData<Unit>> {
    const unit = await this.unitService.getUnitById(id);
    if (!unit) {
      throw new NotFoundException('Unit does not exist!');
    }

    try {
      const res = await this.unitService.updateUnit(id, unitData);
      return ResponseData.getSuccessData(res);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update unit');
    }
  }

  @Delete(':id')
  async deleteUnit(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<{}>> {
    const unit = await this.unitService.getUnitById(id);
    if (!unit) {
      throw new NotFoundException('Unit does not exist!');
    }

    try {
      await this.unitService.deleteUnit(id);
      return ResponseData.getSuccessData({});
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete unit');
    }
  }
}