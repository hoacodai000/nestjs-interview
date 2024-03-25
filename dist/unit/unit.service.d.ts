import { Repository } from 'typeorm';
import { Unit } from './unit.entity';
export declare class UnitService {
    private readonly unitRepository;
    constructor(unitRepository: Repository<Unit>);
    getUnits(): Promise<Unit[]>;
    getUnitById(id: number): Promise<Unit>;
    createUnit(unitData: Unit): Promise<Unit>;
    updateUnit(id: number, unit: Partial<Unit>): Promise<Unit>;
    deleteUnit(id: number): Promise<void>;
}
