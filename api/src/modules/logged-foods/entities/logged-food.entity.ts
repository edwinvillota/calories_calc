import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ILoggedFood } from '../interfaces/ILoggedFood';
import { Food } from 'src/modules/foods/entities/food.entity';
import { Meal } from 'src/modules/meals/entities/meal.entity';

@Entity()
export class LoggedFood implements ILoggedFood {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ManyToOne(() => Meal, (meal) => meal.logged_foods, {
    nullable: false,
  })
  @JoinColumn({ name: 'meal_id' })
  meal: Meal;

  @Column({ nullable: false })
  meal_id: string;

  @ManyToOne(() => Food, { nullable: false, eager: true })
  @JoinColumn()
  food: Food;

  @Column({ nullable: false, type: 'float' })
  servings_consumed: number;
}
