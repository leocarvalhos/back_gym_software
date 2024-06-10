import { Student } from 'src/students/entities/student.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: true })
  read: boolean;

  @ManyToOne(() => Student, (student) => student.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
