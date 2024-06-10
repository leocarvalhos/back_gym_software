import { BadRequestException, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { paginateRaw } from 'nestjs-typeorm-paginate';
import { deleteFile, uploadFile } from 'src/aws/storage';
import { PlansService } from 'src/plans/plans.service';
import { LessThan, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { File } from '@nest-lab/fastify-multer';
import { RenewalStudentDto } from './dto/renewal.dto';

@Injectable()
export class StudentsService {
  constructor(
    private readonly planService: PlansService,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  @Cron('00 00 * * *')
  async studentInactivation() {
    await this.studentRepository.update(
      { due_date: LessThan(new Date()) },
      { active: false },
    );
  }

  async disablingInstructor(id: string) {
    await this.studentRepository.update(
      { instructor: { id } },
      { instructor: null },
    );
  }

  async addPhoto(file: File, id: string) {
    if (file === undefined) {
      throw new BadRequestException('File é obrigatório!');
    }

    const image = await uploadFile(
      `${id}/${file.originalname}`,
      file.buffer,
      file.mimetype,
    );

    return await this.update(id, {
      photo: image.url,
    });
  }

  async findStudentWithAllData(id: string) {
    const student = await this.studentRepository.findOne({
      select: {
        instructor: {
          id: true,
          name: true,
        },
        plan: {
          id: true,
          name: true,
        },
      },
      relations: [
        'instructor',
        'plan',
        'training',
        'training.trainingWorkout',
        'training.trainingWorkout.workout',
      ],
      where: { id: id },
    });

    return student;
  }
  async create(createStudentDto: CreateStudentDto) {
    const { days } = await this.planService.findOneByID(
      createStudentDto.plan_id,
    );
    const dueDate = new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
    const student = await this.studentRepository.save({
      ...createStudentDto,
      plan: { id: createStudentDto.plan_id },
      instructor: { id: createStudentDto.instructor_id },
      due_date: dueDate,
    });

    return student;
  }

  async findStudents({ student, basic, page, limit, filter }: any) {
    const queryBuilder = this.studentRepository
      .createQueryBuilder('student')
      .select([
        'student.id as id',
        'student.name as name',
        'birthday',
        'active',
        'photo',
      ]);

    if (!basic) {
      queryBuilder
        .select(['student.*', 'instructor.id', 'instructor.name'])
        .leftJoin('student.instructor', 'instructor');
    }

    switch (filter) {
      case 'inactive':
        queryBuilder.where('student.active = false');

        break;

      case 'no_training':
        queryBuilder
          .leftJoin('student.training', 'training')
          .where('training.id IS NULL');

        break;

      case 'no_instructor':
        queryBuilder.where('student.instructor IS NULL');

        break;
    }

    if (student) {
      queryBuilder.andWhere('student.name ILIKE :name OR student.cpf = :cpf', {
        name: `%${student}%`,
        cpf: student,
      });
    }

    queryBuilder.orderBy({
      'student.name': 'ASC',
      'student.active': 'DESC',
    });

    return paginateRaw(queryBuilder, { page, limit });
  }

  async findStudentByID(id: string) {
    const student = await this.studentRepository.findOne({
      select: {
        instructor: {
          id: true,
          name: true,
        },
      },
      relations: { instructor: true },
      where: { id: id },
    });

    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const { instructor_id, plan_id } = updateStudentDto;

    delete updateStudentDto.instructor_id;

    delete updateStudentDto.plan_id;

    if (instructor_id && plan_id) {
      const update = await this.studentRepository.update(id, {
        ...updateStudentDto,
        instructor: { id: instructor_id },
        plan: { id: plan_id },
      });

      return update;
    } else if (instructor_id && !plan_id) {
      const update = await this.studentRepository.update(id, {
        ...updateStudentDto,
        instructor: { id: instructor_id },
      });

      return update;
    } else if (plan_id && !instructor_id) {
      const update = await this.studentRepository.update(id, {
        ...updateStudentDto,
        plan: { id: plan_id },
      });

      return update;
    } else {
      const update = await this.studentRepository.update(id, updateStudentDto);

      return update;
    }
  }

  async renewal(id: string, renewalStudentDto: RenewalStudentDto) {
    const { plan_id } = renewalStudentDto;
    const { days } = await this.planService.findOneByID(plan_id);
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + days);

    const newDate =
      currentDate.toISOString().substring(0, 10) + 'T03:00:00.000Z';
    const updateDueDate = await this.update(id, {
      due_date: newDate,
      active: true,
    });

    return updateDueDate;
  }

  async delete(id: string) {
    deleteFile(id);

    return this.studentRepository.delete(id);
  }
}
