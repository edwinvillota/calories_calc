import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Food } from '../foods/entities/food.entity';
import { ExerciseActivity } from '../exercise-activities/entities/exercise-activity.entity';
import { LoggedExercise } from '../logged-exercises/entities/logged-exercise.entity';
import { Exercise } from '../exercises/entities/exercise.entity';
import { Meal } from '../meals/entities/meal.entity';
import { LoggedFood } from '../logged-foods/entities/logged-food.entity';
import { mockedUsers, mockedFoods, mockedExerciseActivities } from './mocks';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Food)
    private foodsRepository: Repository<Food>,
    @InjectRepository(ExerciseActivity)
    private exerciseActivitiesRepository: Repository<ExerciseActivity>,
    @InjectRepository(LoggedExercise)
    private loggedExercisesRepository: Repository<LoggedExercise>,
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
    @InjectRepository(Meal)
    private mealsRepository: Repository<Meal>,
    @InjectRepository(LoggedExercise)
    private loggedExerciseRepository: Repository<LoggedExercise>,
    @InjectRepository(LoggedFood)
    private loggedFoodsRepository: Repository<LoggedFood>,
  ) {}

  async purge() {
    await this.loggedFoodsRepository.delete({});
    await this.loggedExerciseRepository.delete({});
    await this.mealsRepository.delete({});
    await this.exercisesRepository.delete({});
    await this.loggedExercisesRepository.delete({});
    await this.exerciseActivitiesRepository.delete({});
    await this.foodsRepository.delete({});
    await this.usersRepository.delete({});
    return { message: 'Database purged' };
  }

  async seed() {
    await this.seedUsers();
    await this.seedFoods();
    await this.seedExerciseActivities();
    return { message: 'Database seeded' };
  }

  seedUsers() {
    return this.usersRepository.save(mockedUsers);
  }

  seedFoods() {
    return this.foodsRepository.save(mockedFoods);
  }

  seedExerciseActivities() {
    return this.exerciseActivitiesRepository.save(mockedExerciseActivities);
  }
}
