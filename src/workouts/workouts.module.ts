import { Module, forwardRef } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout]), forwardRef(() => AuthModule)],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  exports: [WorkoutsService],
})
export class WorkoutsModule {}
