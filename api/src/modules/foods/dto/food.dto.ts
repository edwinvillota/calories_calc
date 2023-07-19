import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';

export class FoodDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  calories_per_serving: number;

  @IsInt()
  @Min(0)
  protein_per_serving: number;

  @IsInt()
  @Min(0)
  carbs_per_serving: number;

  @IsInt()
  @Min(0)
  fat_per_serving: number;

  @IsInt()
  @Min(0)
  serving_size: number;

  @IsNotEmpty()
  @IsString()
  serving_size_unit: string;
}
