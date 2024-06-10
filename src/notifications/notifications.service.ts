import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/role.enum';
import { Student } from 'src/students/entities/student.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  @Cron('00 00 * * *')
  async checkStudentsSession() {
    try {
      const students = await this.studentRepository
        .createQueryBuilder('s')
        .select(['s.name', 's.id', 'instructor.id'])
        .where('s.total_session - s.current_session = 1')
        .andWhere('s.current_session > 0')
        .innerJoin('s.instructor', 'instructor')
        .getMany();

      await Promise.all(
        students.map(async (student) => {
          const existingNotification = await this.notificationRepository
            .createQueryBuilder('n')
            .where('n.student.id = :studentId', { studentId: student.id })
            .andWhere('n.title = :title', { title: 'Sessão quase esgotada' })
            .andWhere('n.read = false')
            .getOne();

          if (!existingNotification) {
            await this.notificationRepository
              .createQueryBuilder()
              .insert()
              .into(Notification)
              .values({
                title: 'Sessão quase esgotada',
                description: `A sessão do aluno ${student.name} está quase esgotada.`,
                read: false,
                student: { id: student.id, active: true },
                user: { id: student.instructor.id },
              })
              .execute();
          }
        }),
      );
    } catch (error) {
      console.error('Error in checkStudentsSession:', error);
    }
  }
  @Cron('15 00 * * *')
  async checkStudentsWithoutTraining() {
    try {
      const studentsWithoutTrainingAndUnreadNotification =
        await this.studentRepository
          .createQueryBuilder('s')
          .select(['s.id', 's.name', 's.instructor.id as instructor_id'])
          .leftJoinAndSelect('s.instructor', 'instructor')
          .leftJoin('s.training', 'training')
          .leftJoin(
            's.notifications',
            'notification',
            'notification.read = false',
          )
          .where('instructor.id IS NOT NULL')
          .andWhere('training.id IS NULL')
          .andWhere('notification.id IS NULL')
          .getMany();
      const notificationsToInsert =
        studentsWithoutTrainingAndUnreadNotification.map((student: any) => ({
          title: 'Aluno sem treino!',
          description: `Crie um treino para ${student.name} `,
          read: false,
          student: { id: student.id, active: true },
          user: { id: student.instructor.id },
        }));

      await this.notificationRepository.insert(notificationsToInsert);
    } catch (error) {
      console.error('Error in checkStudentsWithoutTraining:', error);
    }
  }

  @Cron('30 00 * * *')
  async notifyReceptionists() {
    const studentsWithoutInstructor = await this.studentRepository.find({
      select: ['id', 'name'],
      where: {
        instructor: null,
      },
    });
    const receptionists = await this.userRepository.find({
      select: ['id'],
      where: { role: Role.Receptionist },
    });
    const notificationsToCreate: any = receptionists
      .map((receptionist) => {
        return studentsWithoutInstructor.map((student) => ({
          title: `${student.name} está sem um instrutor`,
          description: `O aluno ${student.name} está sem um instrutor atribuído.`,
          read: false,
          student: { id: student.id, active: true },
          user: { id: receptionist.id },
        }));
      })
      .flat();

    await this.notificationRepository.insert(notificationsToCreate);
  }

  async notificationsByInstructorRead(id: string) {
    const notifications = await this.notificationRepository.findBy({
      user: { id },
      read: true,
    });

    return notifications;
  }

  async notificationsByInstructorUnRead(id: string) {
    const notifications = await this.notificationRepository.find({
      select: {
        user: { id: true, name: true },
        student: { id: true, name: true },
      },
      relations: { user: true, student: true },
      where: { user: { id }, read: false },
    });
    const notificationCount = notifications.length;

    if (!notificationCount) {
      return { notifications, notificationCount: 0 };
    }

    return { notifications, notificationCount };
  }

  async updateOneRead(id: string) {
    return await this.notificationRepository.update(id, { read: true });
  }
}
