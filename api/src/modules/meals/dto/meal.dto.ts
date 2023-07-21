import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { MealType } from '../entities/meal.entity';
import { Type } from 'class-transformer';
import { LoggedFoodDto } from 'src/modules/logged-foods/dto/logged-food.dto';

export class MealDto {
  @IsDate()
  @Type(() => Date)
  log_date: Date;

  @IsEnum(MealType)
  meal_type: MealType;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LoggedFoodDto)
  logged_foods!: LoggedFoodDto[];
}
