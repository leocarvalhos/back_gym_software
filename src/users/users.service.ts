import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { paginate } from 'nestjs-typeorm-paginate';
import { Role } from 'src/auth/role.enum';
import { deleteFile, uploadFile } from 'src/aws/storage';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { File } from '@nest-lab/fastify-multer';
import { StudentsService } from 'src/students/students.service';
import { NotificationsService } from 'src/notifications/notifications.service';

interface QueryUser {
  user?: string;
  page?: number;
  limit?: number;
  basic?: boolean;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private studentService: StudentsService,
    private notificationsService: NotificationsService,
  ) {}

  async addPhoto(file: File, id: string) {
    if (file === undefined) return;

    const image = await uploadFile(
      `${id}/${file.originalname}`,
      file.buffer,
      file.mimetype,
    );

    return await this.update(id, {
      photo: image.url,
    });
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    return await this.userRepository.save(createUserDto);
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOneByOrFail({ username });
  }

  async findUserById(id: string): Promise<User | undefined> {
    return this.userRepository.findOneByOrFail({ id });
  }

  async findUser({ user, page, limit }: QueryUser) {
    const queryBuilder = this.userRepository.createQueryBuilder();

    if (user) {
      queryBuilder.where('name ILIKE :name', {
        name: `%${user}%`,
      });
    }

    queryBuilder.orderBy({
      active: 'DESC',
      name: 'ASC',
    });

    return paginate<User>(queryBuilder, { page, limit });
  }

  async findByRole(role: Role) {
    if (role === Role.Instructor) {
      const instructorsWithStudentCount = await this.userRepository
        .createQueryBuilder('user')
        .select([
          'user.id AS instructor_id',
          'user.name AS name',
          'COUNT(student.id) AS studentCount',
        ])
        .leftJoin('user.student', 'student')
        .where('user.role = :role', { role: 'instructor' })
        .groupBy('user.id')
        .getRawMany();

      return instructorsWithStudentCount;
    } else {
      const users = await this.userRepository.find({
        select: ['id', 'name'],
        where: { role: role, active: true },
      });

      return users;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!updateUserDto.active) {
      const user = await this.userRepository.findOne({
        select: ['role'],
        where: { id },
      });

      if (user.role === 'instructor') {
        await this.studentService.disablingInstructor(id);

        await this.notificationsService.notifyReceptionists();
      }
    }

    return await this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string) {
    deleteFile(id);

    return this.userRepository.delete(id);
  }
}
