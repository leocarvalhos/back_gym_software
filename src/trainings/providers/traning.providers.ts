import { DataSource } from 'typeorm';
import { Training } from '../entities/training.entity';

export const trainingProviders = [
  {
    provide: 'TRAINING_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Training),
    inject: ['DATA_SOURCE'],
  },
];
