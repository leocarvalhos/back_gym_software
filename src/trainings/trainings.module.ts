import { Module, forwardRef } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { TrainingsController } from './trainings.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './entities/training.entity';
import { TrainingWorkoutModule } from 'src/training_workout/training_workout.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Training]),
    forwardRef(() => AuthModule),
    TrainingWorkoutModule,
  ],
  controllers: [TrainingsController],
  providers: [TrainingsService],
  exports: [TrainingsService],
})
export class TrainingsModule {}
