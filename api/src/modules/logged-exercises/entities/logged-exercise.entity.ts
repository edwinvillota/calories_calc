import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ILoggedExercise } from '../interfaces/ILoggedExercise';
import { ExerciseActivity } from 'src/modules/exercise-activities/entities/exercise-activity.entity';
import { Exercise } from 'src/modules/exercises/entities/exercise.entity';

@Entity()
export class LoggedExercise implements ILoggedExercise {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.logged_exercises, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @Column({ nullable: false })
  exercise_id: string;

  @ManyToOne(() => ExerciseActivity, { nullable: false, eager: true })
  @JoinColumn()
  exercise_activity: ExerciseActivity;

  @Column({ nullable: false })
  duration_minutes: number;
}
