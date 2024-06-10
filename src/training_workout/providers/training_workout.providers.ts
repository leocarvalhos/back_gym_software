import { DataSource } from 'typeorm';
import { TrainingWorkout } from '../entities/training_workout.entity';

export const trainingWorkoutProviders = [
  {
    provide: 'TRANINGWORKOUT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TrainingWorkout),
    inject: ['DATA_SOURCE'],
  },
];
