import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IExercise } from '../interfaces/IExercise';
import { LoggedExercise } from 'src/modules/logged-exercises/entities/logged-exercise.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity()
export class Exercise implements IExercise {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ManyToOne(() => User, (user) => user.exercises, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: false, type: Date })
  log_date: Date;

  @OneToMany(
    () => LoggedExercise,
    (loggedExercise) => loggedExercise.exercise,
    { eager: true },
  )
  @JoinTable({ name: 'exercise_logged_exercises' })
  logged_exercises: LoggedExercise[];
}
