import { IsInt, IsNotEmpty, IsString, Min, NotContains } from 'class-validator';

export class FoodDto {
  @IsNotEmpty()
  @IsString()
  @NotContains(' ')
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
  @NotContains(' ')
  serving_size_unit: string;
}
