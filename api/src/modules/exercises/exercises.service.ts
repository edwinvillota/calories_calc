import {
  ConflictException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { Exercise } from './entities/exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ExerciseActivitiesService } from '../exercise-activities/exercise-activities.service';
import { LoggedExercisesService } from '../logged-exercises/logged-exercises.service';
import { ExerciseDto } from './dto/exercise.dto';
import { LoggedExerciseDto } from '../logged-exercises/dto/logged-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
    private usersService: UsersService,
    private exerciseActivitiesService: ExerciseActivitiesService,
    @Inject(forwardRef(() => LoggedExercisesService))
    private loggedExercisesService: LoggedExercisesService,
  ) {}

  private findExerciseById(id: number, userId: number) {
    return this.exercisesRepository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });
  }

  getExercisesByUserId(userId: number) {
    return this.exercisesRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async getExerciseById(userId: number, exerciseId: number) {
    const exercise = await this.findExerciseById(exerciseId, userId);

    if (!exercise) {
      throw new ConflictException('Exercise does not exist');
    }

    return exercise;
  }

  async createExercise(userId: number, exerciseDto: ExerciseDto) {
    const user = await this.usersService.getUserById(userId);

    for (const loggedExercise of exerciseDto.logged_exercises) {
      await this.exerciseActivitiesService.getActivityById(
        loggedExercise.exercise_activity.id,
      );
    }

    const newExercise = this.exercisesRepository.create({
      ...exerciseDto,
      user,
    });

    const createdExercise = await this.exercisesRepository.save(newExercise);
    return createdExercise;
  }

  async updateExercise(
    userId: number,
    id: number,
    exercise: Partial<ExerciseDto>,
  ) {
    const existingExercise = await this.findExerciseById(id, userId);

    if (!existingExercise) {
      throw new ConflictException('Exercise does not exist');
    }

    if (exercise.logged_exercises?.length) {
      for (const loggedExercise of exercise.logged_exercises) {
        await this.exerciseActivitiesService.getActivityById(
          loggedExercise.exercise_activity.id,
        );
      }
    }

    const updatedExercise = await this.exercisesRepository.save({
      ...existingExercise,
      ...exercise,
    });

    return updatedExercise;
  }

  async deleteExercise(userId: number, id: number) {
    const existingExercise = await this.findExerciseById(id, userId);

    if (!existingExercise) {
      throw new ConflictException('Exercise does not exist');
    }

    await this.exercisesRepository.remove(existingExercise);

    return true;
  }

  async addLoggedExerciseToExercise(
    userId: number,
    exerciseId: number,
    loggedExercise: LoggedExerciseDto,
  ) {
    const exercise = await this.findExerciseById(exerciseId, userId);

    if (!exercise) {
      throw new ConflictException('Exercise does not exist');
    }

    await this.loggedExercisesService.addLoggedExerciseToExercise(
      userId,
      exerciseId,
      loggedExercise,
    );

    const updatedExercise = await this.findExerciseById(exerciseId, userId);

    return updatedExercise;
  }

  async removeLoggedExerciseFromExercise(
    userId: number,
    exerciseId: number,
    loggedExerciseId: number,
  ) {
    const exercise = await this.findExerciseById(exerciseId, userId);

    if (!exercise) {
      throw new ConflictException('Exercise does not exist');
    }

    await this.loggedExercisesService.removeLoggedExerciseFromExercise(
      userId,
      exerciseId,
      loggedExerciseId,
    );

    return true;
  }
}
