import { LocationService } from './location.service';
import { Location } from './location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationDto } from './dto/location.dto';
import { ResponseData } from '../common/models/response';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    getLocations(): Promise<ResponseData<LocationDto[]>>;
    getLocationById(id: number): Promise<ResponseData<LocationDto>>;
    getLocationsByParentId(parentId: number): Promise<ResponseData<LocationDto[]>>;
    createLocation(createLocationDto: CreateLocationDto): Promise<ResponseData<Location>>;
    updateLocationBySubtree(id: number, idReplace: number): Promise<ResponseData<LocationDto[]>>;
    updateLocation(id: number, locationData: UpdateLocationDto): Promise<ResponseData<Location>>;
    deleteLocationAndSubtree(id: number): Promise<ResponseData<{}>>;
    deleteLocation(id: number): Promise<ResponseData<{}>>;
}
