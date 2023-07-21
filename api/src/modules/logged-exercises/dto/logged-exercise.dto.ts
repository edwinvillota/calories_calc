import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { ExerciseActivityDto } from 'src/modules/exercise-activities/dto/exercise-activity.dto';

export class LoggedExerciseDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  id: number;

  @IsNotEmpty()
  @Type(() => ExerciseActivityDto)
  exercise_activity: ExerciseActivityDto;

  @IsInt()
  @Min(1)
  duration_minutes: number;
}
