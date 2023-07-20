import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExerciseActivitiesService } from './exercise-activities.service';
import { ExerciseActivityDto } from './dto/exercise-activity.dto';

@Controller('/api/v1/exercise-activities')
@UseGuards(AuthGuard('jwt'))
export class ExerciseActivitiesController {
  constructor(
    private readonly exerciseActivitiesService: ExerciseActivitiesService,
  ) {}

  @Get()
  getExerciseActivities() {
    return this.exerciseActivitiesService.getAllActivities();
  }

  @Post('create')
  createExerciseActivity(@Body() activity: ExerciseActivityDto) {
    return this.exerciseActivitiesService.createActivity(activity);
  }

  @Get(':id')
  getExerciseActivityById(id: number) {
    return this.exerciseActivitiesService.getActivityById(id);
  }

  @Put(':id')
  updateExerciseActivity(
    @Param('id') id: number,
    @Body() activity: Partial<ExerciseActivityDto>,
  ) {
    return this.exerciseActivitiesService.updateActivity(id, activity);
  }

  @Delete(':id')
  deleteExerciseActivity(@Param('id') id: number) {
    return this.exerciseActivitiesService.deleteActivity(id);
  }
}
