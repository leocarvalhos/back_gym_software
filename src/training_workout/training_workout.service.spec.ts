import { Test, TestingModule } from '@nestjs/testing';
import { TrainingWorkoutService } from './training_workout.service';

describe('TrainingWorkoutService', () => {
  let service: TrainingWorkoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingWorkoutService],
    }).compile();

    service = module.get<TrainingWorkoutService>(TrainingWorkoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
