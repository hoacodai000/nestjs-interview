import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { LocationDto } from './dto/location.dto';
export declare class LocationService {
    private readonly locationRepository;
    constructor(locationRepository: Repository<Location>);
    getLocations(): Promise<LocationDto[]>;
    getLocationById(id: number): Promise<LocationDto[]>;
    getLocationsByParentId(parentId: number): Promise<LocationDto[]>;
    createLocation(locationData: Location): Promise<Location>;
    updateLocationBySubtree(idReplace: number, ids: string): Promise<void>;
    updateLocation(id: number, location: Partial<Location>): Promise<Location>;
    deleteLocation(id: number): Promise<void>;
    deleteLocations(ids: string): Promise<void>;
}
