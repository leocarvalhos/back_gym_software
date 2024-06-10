import { Training } from 'src/trainings/entities/training.entity';
import { Workout } from 'src/workouts/entities/workout.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TrainingWorkout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Training, (training) => training.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'training_id' })
  training: Training;

  @ManyToOne(() => Workout, (workout) => workout.id)
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;

  @Column({ type: 'text', nullable: true })
  observation: string;

  @Column('int')
  sets: number;

  @Column('text')
  repetitions: string;

  @Column({ type: 'int', nullable: true })
  order: number;
}
