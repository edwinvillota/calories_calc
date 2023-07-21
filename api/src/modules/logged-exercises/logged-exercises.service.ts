import {
  ConflictException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggedExercise } from './entities/logged-exercise.entity';
import { Repository } from 'typeorm';
import { LoggedExerciseDto } from './dto/logged-exercise.dto';
import { ExercisesService } from '../exercises/exercises.service';

@Injectable()
export class LoggedExercisesService {
  constructor(
    @InjectRepository(LoggedExercise)
    private loggedExercisesRepository: Repository<LoggedExercise>,
    @Inject(forwardRef(() => ExercisesService))
    private exercisesService: ExercisesService,
  ) {}

  private findLoggedExerciseById(id: number) {
    return this.loggedExercisesRepository.findOneBy({ id });
  }

  async getLoggedExercisesByExerciseId(exerciseId: number) {
    return this.loggedExercisesRepository.find({
      where: {
        exercise: {
          id: exerciseId,
        },
      },
    });
  }

  async getLoggedExerciseById(id: number) {
    const loggedExercise = await this.findLoggedExerciseById(id);

    if (!loggedExercise) {
      throw new ConflictException(`Logged exercise with id ${id} not found`);
    }

    return loggedExercise;
  }

  async addLoggedExerciseToExercise(
    userId: number,
    exerciseId: number,
    loggedExercise: LoggedExerciseDto,
  ) {
    const exercise = await this.exercisesService.getExerciseById(
      userId,
      exerciseId,
    );

    const createdLoggedExercise = await this.loggedExercisesRepository.create({
      ...loggedExercise,
      exercise,
    });

    return this.loggedExercisesRepository.save(createdLoggedExercise);
  }

  async removeLoggedExerciseFromExercise(
    userId: number,
    exerciseId: number,
    loggedExerciseId: number,
  ) {
    await this.exercisesService.getExerciseById(userId, exerciseId);

    const loggedExercise = await this.getLoggedExerciseById(loggedExerciseId);

    return this.loggedExercisesRepository.remove(loggedExercise);
  }

  async updateLoggedExerciseById(
    id: number,
    loggedExercise: Partial<LoggedExerciseDto>,
  ) {
    const foundLoggedExercise = await this.findLoggedExerciseById(id);

    if (!foundLoggedExercise) {
      throw new ConflictException(`Logged exercise with id ${id} not found`);
    }

    return this.loggedExercisesRepository.save({
      ...foundLoggedExercise,
      ...loggedExercise,
    });
  }

  async deleteLoggedExerciseById(id: number) {
    const foundLoggedExercise = await this.findLoggedExerciseById(id);

    if (!foundLoggedExercise) {
      throw new ConflictException(`Logged exercise with id ${id} not found`);
    }

    return this.loggedExercisesRepository.remove(foundLoggedExercise);
  }
}
