import { Test, TestingModule } from '@nestjs/testing';
import { TrainingWorkoutController } from './training_workout.controller';
import { TrainingWorkoutService } from './training_workout.service';

describe('TrainingWorkoutController', () => {
  let controller: TrainingWorkoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingWorkoutController],
      providers: [TrainingWorkoutService],
    }).compile();

    controller = module.get<TrainingWorkoutController>(
      TrainingWorkoutController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
