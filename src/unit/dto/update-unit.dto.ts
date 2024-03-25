import { IsString, IsOptional } from 'class-validator';

export class UpdateUnitDto {
  @IsOptional()
  @IsString()
  unit_code: string;

  @IsOptional()
  @IsString()
  name: string;
}
