import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  NotContains,
} from 'class-validator';
import { ActivityLevel, Gender, Goal } from '../entities/user.entity';
import { IUser } from '../interfaces/IUser';

export class UserDto implements IUser {
  @IsNotEmpty()
  @IsString()
  @NotContains(' ')
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNumber()
  @Min(18)
  @Max(99)
  age: number;

  @IsEnum(Gender)
  gender: Gender;

  @IsNumber()
  @Min(30)
  @Max(300)
  weight: number;

  @IsNumber()
  @Min(120)
  @Max(250)
  height: number;

  @IsEnum(ActivityLevel)
  activityLevel: ActivityLevel;

  @IsEnum(Goal)
  goal: Goal;
}
