export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum ActivityLevel {
  SEDENTARY = "sedentary",
  LIGHTLY_ACTIVE = "lightly_active",
  MODERATELY_ACTIVE = "moderately_active",
  VERY_ACTIVE = "very_active",
}

export enum Goal {
  LOSE_WEIGHT = "lose_weight",
  MAINTAIN_WEIGHT = "maintain_weight",
  GAIN_WEIGHT = "gain_weight",
}

export interface UserModel {
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
