import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { LoggedExerciseDto } from 'src/modules/logged-exercises/dto/logged-exercise.dto';

export class ExerciseDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsDate()
  @Type(() => Date)
  log_date: Date;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LoggedExerciseDto)
  logged_exercises!: LoggedExerciseDto[];
}
