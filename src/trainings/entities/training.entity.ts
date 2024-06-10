import { Student } from 'src/students/entities/student.entity';
import { TrainingWorkout } from 'src/training_workout/entities/training_workout.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Training {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Student, (student) => student.id)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @OneToMany(
    () => TrainingWorkout,
    (trainingWorkout) => trainingWorkout.training,
  )
  trainingWorkout: TrainingWorkout[];
}
