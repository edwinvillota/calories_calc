import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ExerciseActivity } from './entities/exercise-activity.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseActivityDto } from './dto/exercise-activity.dto';

@Injectable()
export class ExerciseActivitiesService {
  constructor(
    @InjectRepository(ExerciseActivity)
    private readonly exerciseActivityRepository: Repository<ExerciseActivity>,
  ) {}

  private findActivityById(id: number) {
    return this.exerciseActivityRepository.findOneBy({ id });
  }

  private findActivityByName(name: string) {
    return this.exerciseActivityRepository.findOneBy({ name });
  }

  getAllActivities() {
    return this.exerciseActivityRepository.find();
  }

  async getActivityById(id: number) {
    const activity = await this.findActivityById(id);

    if (!activity) {
      throw new NotFoundException('Activity does not exist');
    }

    return activity;
  }

  async createActivity(activity: ExerciseActivityDto) {
    const existingActivity = await this.findActivityByName(activity.name);

    if (existingActivity) {
      throw new BadRequestException('Activity already exists');
    }

    const newActivity = this.exerciseActivityRepository.create(activity);
    const createdActivity = await this.exerciseActivityRepository.save(
      newActivity,
    );
    return createdActivity;
  }

  async updateActivity(id: number, activity: Partial<ExerciseActivityDto>) {
    const existingActivity = await this.findActivityById(id);

    if (!existingActivity) {
      throw new BadRequestException('Activity does not exist');
    }

    const updatedActivity = await this.exerciseActivityRepository.save({
      ...existingActivity,
      ...activity,
    });
    return updatedActivity;
  }

  async deleteActivity(id: number) {
    const existingActivity = await this.findActivityById(id);

    if (!existingActivity) {
      throw new BadRequestException('Activity does not exist');
    }

    await this.exerciseActivityRepository.remove(existingActivity);
    return true;
  }
}
