import { ExerciseActivity } from 'src/modules/exercise-activities/entities/exercise-activity.entity';
import { Exercise } from 'src/modules/exercises/entities/exercise.entity';

export interface ILoggedExercise {
  id: number;
  exercise: Exercise;
  exercise_id: string;
  exercise_activity: ExerciseActivity;
  duration_minutes: number;
}
