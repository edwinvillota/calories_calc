import { Module } from '@nestjs/common';
import { ExerciseActivitiesController } from './exercise-activities.controller';
import { ExerciseActivitiesService } from './exercise-activities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseActivity } from './entities/exercise-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseActivity])],
  controllers: [ExerciseActivitiesController],
  providers: [ExerciseActivitiesService],
  exports: [ExerciseActivitiesService],
})
export class ExerciseActivitiesModule {}
