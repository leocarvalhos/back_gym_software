import { Student } from 'src/students/entities/student.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  days: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  value: number;

  @Column()
  description: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => Student, (student) => student.plan)
  student: Student[];
}
