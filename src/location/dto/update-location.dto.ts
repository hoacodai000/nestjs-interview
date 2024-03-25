import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateLocationDto {
  @IsOptional()
  @IsString()
  location_number: string;

  @IsOptional()
  @IsString()
  location_name: string;

  @IsOptional()
  @IsNumber()
  area: number;

  @IsOptional()
  @IsNumber()
  unit_id: number;

  @IsOptional()
  @IsNumber()
  parent_id: number;
}
