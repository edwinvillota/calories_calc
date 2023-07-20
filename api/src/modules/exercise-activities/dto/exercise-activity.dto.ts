import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  NotContains,
} from 'class-validator';

export class ExerciseActivityDto {
  @IsNotEmpty()
  @IsString()
  @NotContains(' ')
  name: string;

  @IsNumber()
  @Min(0.1)
  calories_burned_per_minute: number;
}
