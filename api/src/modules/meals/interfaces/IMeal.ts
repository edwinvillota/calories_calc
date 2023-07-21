import { User } from 'src/modules/users/entities/user.entity';
import { MealType } from '../entities/meal.entity';
import { LoggedFood } from 'src/modules/logged-foods/entities/logged-food.entity';

export interface IMeal {
  id: number;
  user: User;
  log_date: Date;
  meal_type: MealType;
  logged_foods: LoggedFood[];
}
