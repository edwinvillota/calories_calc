import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExercisesService } from './exercises.service';
import { User } from '../auth/decorators/user.decorator';
import { ExerciseDto } from './dto/exercise.dto';
import { LoggedExerciseDto } from '../logged-exercises/dto/logged-exercise.dto';

@Controller('/api/v1/exercises')
@UseGuards(AuthGuard('jwt'))
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  getExercises(@User('id') userId: number) {
    return this.exercisesService.getExercisesByUserId(userId);
  }

  @Post('log')
  createExercise(@User('id') userId: number, @Body() exercise: ExerciseDto) {
    return this.exercisesService.createExercise(userId, exercise);
  }

  @Get(':id')
  getExerciseById(@User('id') userId: number, @Param('id') exerciseId: number) {
    return this.exercisesService.getExerciseById(userId, exerciseId);
  }

  @Put(':id')
  updateExercise(
    @User('id') userId: number,
    @Param('id') exerciseId: number,
    @Body() exercise: Partial<ExerciseDto>,
  ) {
    return this.exercisesService.updateExercise(userId, exerciseId, exercise);
  }

  @Delete(':id')
  deleteExercise(@User('id') userId: number, @Param('id') exerciseId: number) {
    return this.exercisesService.deleteExercise(userId, exerciseId);
  }

  @Patch(':id/logged-exercises/add')
  addLoggedExerciseToExercise(
    @User('id') userId: number,
    @Param('id') exerciseId: number,
    @Body() loggedExercise: LoggedExerciseDto,
  ) {
    return this.exercisesService.addLoggedExerciseToExercise(
      userId,
      exerciseId,
      loggedExercise,
    );
  }

  @Patch(':id/logged-exercises/remove/:loggedExerciseId')
  removeLoggedExerciseFromExercise(
    @User('id') userId: number,
    @Param('id') exerciseId: number,
    @Param('loggedExerciseId') loggedExerciseId: number,
  ) {
    return this.exercisesService.removeLoggedExerciseFromExercise(
      userId,
      exerciseId,
      loggedExerciseId,
    );
  }
}
