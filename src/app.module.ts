import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PlansModule } from './plans/plans.module';
import { StudentsModule } from './students/students.module';
import { TrainingsModule } from './trainings/trainings.module';
import { TrainingWorkoutModule } from './training_workout/training_workout.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationsModule } from './notifications/notifications.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { EmptyBodyInterceptor } from './interceptors/empty-body.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';

@Module({
  imports: [
    UsersModule,
    PlansModule,
    StudentsModule,
    TrainingsModule,
    TrainingWorkoutModule,
    WorkoutsModule,
    AuthModule,
    NotificationsModule,
    MailModule,
    NotificationsModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/src/**/*/*.entity.ts'],
      autoLoadEntities: true,
      synchronize: true,
      verboseRetryLog: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        port: 465,
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS,
        },
      },
    }),
    FastifyMulterModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: EmptyBodyInterceptor,
    },
  ],
})
export class AppModule {}
