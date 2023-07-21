import { Module, forwardRef } from '@nestjs/common';
import { LoggedExercisesService } from './logged-exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggedExercise } from './entities/logged-exercise.entity';
import { ExercisesModule } from '../exercises/exercises.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoggedExercise]),
    forwardRef(() => ExercisesModule),
  ],
  providers: [LoggedExercisesService],
  exports: [LoggedExercisesService],
})
export class LoggedExercisesModule {}
