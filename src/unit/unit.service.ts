import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './unit.entity';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) { }

  async getUnits(): Promise<Unit[]> {
    return this.unitRepository.find();
  }

  async getUnitById(id: number): Promise<Unit> {
    return this.unitRepository.findOne({ where: { id } });
  }

  async createUnit(unitData: Unit): Promise<Unit> {
    const unit = this.unitRepository.create(unitData);
    return this.unitRepository.save(unit);
  }

  async updateUnit(id: number, unit: Partial<Unit>): Promise<Unit> {
    await this.unitRepository.update(id, unit);
    return this.unitRepository.findOne({ where: { id } });
  }

  async deleteUnit(id: number): Promise<void> {
    await this.unitRepository.delete(id);
  }
}