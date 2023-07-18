import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

enum ActivityLevel {
  SEDENTARY = 'sedentary',
  LIGHTLY_ACTIVE = 'lightly_active',
  MODERATELY_ACTIVE = 'moderately_active',
  VERY_ACTIVE = 'very_active',
}

enum Goal {
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

  @Column({ nullable: false })
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
}
