import { ActivityLevel, Gender, Goal } from '../entities/user.entity';

export interface IUser {
  username: string;
  password: string;
  email: string;
  age: number;
  gender: Gender;
  weight: number;
  height: number;
  activityLevel: ActivityLevel;
  goal: Goal;
}
