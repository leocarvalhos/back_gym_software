import { DataSource } from 'typeorm';
import { Workout } from '../entities/workout.entity';

export const workoutProviders = [
  {
    provide: 'WORKOUT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Workout),
    inject: ['DATA_SOURCE'],
  },
];
