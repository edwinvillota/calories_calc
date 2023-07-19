import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IFood } from '../interfaces/IFood';

@Entity()
export class Food implements IFood {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  calories_per_serving: number;

  @Column({ nullable: false })
  protein_per_serving: number;

  @Column({ nullable: false })
  carbs_per_serving: number;

  @Column({ nullable: false })
  fat_per_serving: number;

  @Column({ nullable: false })
  serving_size: number;

  @Column({ nullable: false })
  serving_size_unit: string;
}
