import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from '../foods/entities/food.entity';
import { ExerciseActivity } from '../exercise-activities/entities/exercise-activity.entity';
import { LoggedExercise } from '../logged-exercises/entities/logged-exercise.entity';
import { Exercise } from '../exercises/entities/exercise.entity';
import { Meal } from '../meals/entities/meal.entity';
import { LoggedFood } from '../logged-foods/entities/logged-food.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Food,
      ExerciseActivity,
      LoggedExercise,
      Exercise,
      Meal,
      LoggedExercise,
      LoggedFood,
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
