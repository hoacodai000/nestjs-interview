import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUnitDto {
  @IsString()
  @IsNotEmpty()
  unit_code: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
