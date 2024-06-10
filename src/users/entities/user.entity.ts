import { Role } from 'src/auth/role.enum';
import { Student } from 'src/students/entities/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Notification } from 'src/notifications/entities/notification.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text', nullable: true })
  photo: string;

  @Column({ type: 'text', nullable: true })
  phone: string;

  @Column({ type: Date })
  birthday: Date;

  @Column({ default: true })
  active: boolean;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @OneToMany(() => Student, (student) => student.instructor)
  student: Student[];

  @OneToMany(() => Notification, (notification) => notification.user, {
    nullable: true,
  })
  notifications: Notification[];
}
