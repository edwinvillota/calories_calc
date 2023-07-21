import { LoggedExercise } from 'src/modules/logged-exercises/entities/logged-exercise.entity';
import { User } from 'src/modules/users/entities/user.entity';

export interface IExercise {
  id: number;
  user: User;
  log_date: Date;
  logged_exercises: LoggedExercise[];
}
