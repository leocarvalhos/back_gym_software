import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Workout } from './entities/workout.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';

interface QueryWorkout {
  workout?: string;
  page: number;
  limit: number;
}

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>,
  ) {}

  async create(createWorkoutDto: CreateWorkoutDto) {
    await this.workoutRepository.save(createWorkoutDto);

    return createWorkoutDto;
  }

  async findAll({ page, limit, workout }: QueryWorkout) {
    const queryBuilder = this.workoutRepository
      .createQueryBuilder('workout')
      .select(['workout.id', 'workout.name'])
      .orderBy({
        'workout.name': 'ASC',
      });

    if (workout) {
      queryBuilder.where('workout.name ILIKE :workout', {
        workout: `%${workout}%`,
      });
    }

    queryBuilder.orderBy('workout.name');

    if (limit === 0) {
      const number = await this.workoutRepository.count();

      return paginate<Workout>(queryBuilder, { page, limit: number });
    }

    return paginate<Workout>(queryBuilder, { page, limit });
  }

  async findOne(id: string): Promise<Workout> {
    return await this.workoutRepository.findOneByOrFail({ id });
  }

  async update(id: string, updateWorkoutDto: UpdateWorkoutDto) {
    return await this.workoutRepository.update(id, updateWorkoutDto);
  }

  async delete(id: string) {
    return await this.workoutRepository.delete({ id });
  }
}
