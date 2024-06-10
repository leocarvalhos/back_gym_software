import { Module, forwardRef } from '@nestjs/common';
import { TrainingWorkoutService } from './training_workout.service';
import { TrainingWorkoutController } from './training_workout.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingWorkout } from './entities/training_workout.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingWorkout]),
    forwardRef(() => AuthModule),
  ],
  controllers: [TrainingWorkoutController],
  providers: [TrainingWorkoutService],
  exports: [TrainingWorkoutService],
})
export class TrainingWorkoutModule {}
