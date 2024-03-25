import { UnitService } from './unit.service';
import { Unit } from './unit.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { ResponseData } from '../common/models/response';
export declare class UnitController {
    private readonly unitService;
    constructor(unitService: UnitService);
    getUnits(): Promise<ResponseData<Unit[]>>;
    getUnitById(id: number): Promise<ResponseData<Unit>>;
    createUnit(createUnitDto: CreateUnitDto): Promise<ResponseData<Unit>>;
    updateUnit(id: number, unitData: UpdateUnitDto): Promise<ResponseData<Unit>>;
    deleteUnit(id: number): Promise<ResponseData<{}>>;
}
