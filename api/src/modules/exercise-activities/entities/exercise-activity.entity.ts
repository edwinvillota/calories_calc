import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IExerciseActivity } from '../interfaces/IExerciseActivity';

@Entity()
export class ExerciseActivity implements IExerciseActivity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false, type: 'decimal' })
  calories_burned_per_minute: number;
}
