import { Notification } from 'src/notifications/entities/notification.entity';
import { Plan } from 'src/plans/entities/plan.entity';
import { Training } from 'src/trainings/entities/training.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ unique: true, type: 'text' })
  cpf: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'text' })
  street: string;

  @Column({ type: 'text' })
  reference_point: string;

  @Column({ type: 'text' })
  neighborhood: string;

  @Column({ type: 'text', nullable: true })
  observation: string;

  @Column({ type: 'int', default: 1 })
  current_session: number;

  @Column({ type: 'int', nullable: true })
  total_session: number;

  @Column({ type: Date })
  due_date: Date;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'varchar' })
  gender: string;

  @Column({ type: 'text', nullable: true })
  photo: string;

  @Column({ type: Date })
  birthday: Date;

  @Column('text')
  goal: string;

  @OneToMany(() => Training, (training) => training.student, { nullable: true })
  training: Training[];

  @ManyToOne(() => User, (instructor) => instructor.id, { nullable: true })
  @JoinColumn({ name: 'instructor_id' })
  instructor: User;

  @ManyToOne(() => Plan, (plan) => plan.id, { nullable: true })
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @OneToMany(() => Notification, (notification) => notification.student, {
    nullable: true,
  })
  notifications: Notification[];
}
