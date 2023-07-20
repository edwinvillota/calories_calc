import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Meal } from 'src/modules/meals/entities/meal.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum ActivityLevel {
  SEDENTARY = 'sedentary',
  LIGHTLY_ACTIVE = 'lightly_active',
  MODERATELY_ACTIVE = 'moderately_active',
  VERY_ACTIVE = 'very_active',
}

export enum Goal {
  LOSE_WEIGHT = 'lose_weight',
  MAINTAIN_WEIGHT = 'maintain_weight',
  GAIN_WEIGHT = 'gain_weight',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column()
  age: number;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.OTHER,
  })
  gender: Gender;

  @Column({ nullable: false })
  weight: number;

  @Column({ nullable: false })
  height: number;

  @Column({
    type: 'enum',
    enum: ActivityLevel,
    default: ActivityLevel.SEDENTARY,
  })
  activityLevel: ActivityLevel;

  @Column({ type: 'enum', enum: Goal, default: Goal.MAINTAIN_WEIGHT })
  goal: Goal;

  @OneToMany(() => Meal, (meal) => meal.user)
  meals: Meal[];

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
