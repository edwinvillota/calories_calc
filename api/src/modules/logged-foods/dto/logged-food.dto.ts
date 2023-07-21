import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { FoodDto } from 'src/modules/foods/dto/food.dto';

export class LoggedFoodDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  id: number;

  @IsNotEmpty()
  @Type(() => FoodDto)
  food: FoodDto;

  @IsInt()
  @Min(1)
  servings_consumed: number;
}
