import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  location_number: string;

  @IsString()
  @IsNotEmpty()
  location_name: string;

  @IsNumber()
  @IsNotEmpty()
  area: number;

  @IsNumber()
  @IsNotEmpty()
  unit_id: number;

  @IsNumber()
  @IsOptional()
  parent_id: number;
}
