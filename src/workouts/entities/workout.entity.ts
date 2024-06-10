import { TrainingWorkout } from 'src/training_workout/entities/training_workout.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(
    () => TrainingWorkout,
    (trainingWorkout) => trainingWorkout.workout,
  )
  trainingWorkout: TrainingWorkout[];
}
