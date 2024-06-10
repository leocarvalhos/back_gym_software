import { Injectable } from '@nestjs/common';
import { CreateTrainingWorkoutDto } from './dto/create-training_workout.dto';
import { UpdateTrainingWorkoutDto } from './dto/update-training_workout.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingWorkout } from './entities/training_workout.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainingWorkoutService {
  constructor(
    @InjectRepository(TrainingWorkout)
    private trainingWorkoutRepository: Repository<TrainingWorkout>,
  ) {}
  async create(createTrainingWorkoutDto: CreateTrainingWorkoutDto) {
    const training = {
      ...createTrainingWorkoutDto,
      training: { id: createTrainingWorkoutDto.training_id },
      workout: { id: createTrainingWorkoutDto.workout_id },
    };

    delete training.training_id;

    delete training.workout_id;

    await this.trainingWorkoutRepository.save(training);
  }

  async findByTrainingID(id: string) {
    const training_workout = await this.trainingWorkoutRepository.find({
      select: { workout: { id: true, name: true } },
      relations: { workout: true },
      where: {
        training: { id },
      },
      order: { order: 'ASC' },
    });

    return training_workout;
  }

  async updateInBatch(updateTrainingWorkoutDto: UpdateTrainingWorkoutDto[]) {
    const updates = await Promise.all(
      updateTrainingWorkoutDto.map(async (updateTrainingWorkout) => {
        await this.update(
          updateTrainingWorkout.training_workout_id,
          updateTrainingWorkout,
        );
      }),
    );

    return updates;
  }

  async update(id: string, updateTrainingWorkoutDto: UpdateTrainingWorkoutDto) {
    const update = await this.trainingWorkoutRepository.update(id, {
      repetitions: updateTrainingWorkoutDto.repetitions,
      sets: updateTrainingWorkoutDto.sets,
      workout: {
        id: updateTrainingWorkoutDto.workout_id,
      },
      order: updateTrainingWorkoutDto.order,
    });

    return update;
  }

  async delete(id: string) {
    return await this.trainingWorkoutRepository.delete(id);
  }
}
