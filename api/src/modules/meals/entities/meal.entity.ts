import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IMeal } from '../interfaces/IMeal';
import { User } from 'src/modules/users/entities/user.entity';
import { Food } from 'src/modules/foods/entities/food.entity';

export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACK = 'snack',
}

@Entity()
export class Meal implements IMeal {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ManyToOne(() => User, (user) => user.meals, { nullable: false, eager: true })
  user: User;

  @Column({ nullable: false, type: Date })
  log_date: Date;

  @Column({
    type: 'enum',
    enum: MealType,
  })
  meal_type: MealType;

  @ManyToMany(() => Food, { eager: true })
  @JoinTable({ name: 'meal_foods' })
  foods: Food[];
}
