import { LocationDto } from './dto/location.dto';

export function findLocationsOfNode(node_id: number | null, locations: LocationDto[]): LocationDto[] {
  let result: LocationDto[] = [];
  const _findLocationsOfNode = (node_id: number | null, locations: LocationDto[], queue?: LocationDto[]): void => {
    const data = locations.filter((p: LocationDto) => p.parent_id === node_id);
    if (data && data.length) {
      queue = data;
    }
    while (queue && queue.length) {
      const cur = queue.shift() as LocationDto;
      result.push(cur);
      _findLocationsOfNode(cur.id, queue);
    }
  }
  _findLocationsOfNode(node_id, locations);
  return result;
}