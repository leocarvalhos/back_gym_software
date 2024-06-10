import { DataSource } from 'typeorm';
import { Plan } from '../entities/plan.entity';

export const planProviders = [
  {
    provide: 'PLAN_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Plan),
    inject: ['DATA_SOURCE'],
  },
];
