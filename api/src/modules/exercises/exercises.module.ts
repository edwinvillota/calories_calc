import { Module, forwardRef } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { ExerciseActivitiesModule } from '../exercise-activities/exercise-activities.module';
import { LoggedExercisesModule } from '../logged-exercises/logged-exercises.module';
import { Exercise } from './entities/exercise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exercise]),
    UsersModule,
    ExerciseActivitiesModule,
    forwardRef(() => LoggedExercisesModule),
  ],
  providers: [ExercisesService],
  controllers: [ExercisesController],
  exports: [ExercisesService],
})
export class ExercisesModule {}
