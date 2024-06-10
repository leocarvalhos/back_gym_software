import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PlansModule } from 'src/plans/plans.module';
import { TrainingsModule } from 'src/trainings/trainings.module';
import { TrainingWorkoutModule } from 'src/training_workout/training_workout.module';
import { WorkoutsModule } from 'src/workouts/workouts.module';
import { StudentsModule } from 'src/students/students.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => PlansModule),
    forwardRef(() => TrainingsModule),
    forwardRef(() => TrainingWorkoutModule),
    forwardRef(() => WorkoutsModule),
    forwardRef(() => StudentsModule),
    forwardRef(() => NotificationsModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_PASS,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
