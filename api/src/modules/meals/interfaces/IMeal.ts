import { User } from 'src/modules/users/entities/user.entity';
import { MealType } from '../entities/meal.entity';
import { Food } from 'src/modules/foods/entities/food.entity';

export interface IMeal {
  id: number;
  user: User;
  log_date: Date;
  meal_type: MealType;
  foods: Food[];
}
