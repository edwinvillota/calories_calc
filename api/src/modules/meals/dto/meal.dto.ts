import { ArrayNotEmpty, IsArray, IsDate, IsEnum } from 'class-validator';
import { MealType } from '../entities/meal.entity';
import { Type } from 'class-transformer';

import { FoodDto } from 'src/modules/foods/dto/food.dto';

export class MealDto {
  @IsDate()
  @Type(() => Date)
  log_date: Date;

  @IsEnum(MealType)
  meal_type: MealType;

  @IsArray()
  @ArrayNotEmpty()
  @Type(() => FoodDto)
  foods: FoodDto[];
}
