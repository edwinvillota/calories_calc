import { Food } from 'src/modules/foods/entities/food.entity';
import { Meal } from 'src/modules/meals/entities/meal.entity';

export interface ILoggedFood {
  id: number;
  meal: Meal;
  food: Food;
  servings_consumed: number;
}
