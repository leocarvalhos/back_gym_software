import { Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Training } from './entities/training.entity';
import { TrainingWorkoutService } from 'src/training_workout/training_workout.service';

@Injectable()
export class TrainingsService {
  constructor(
    @InjectRepository(Training)
    private trainingRepository: Repository<Training>,
    private trainingWorkoutService: TrainingWorkoutService,
  ) {}

  async create(createTrainingDto: CreateTrainingDto) {
    const name = await this.generateTrainingName(createTrainingDto.student_id);

    createTrainingDto.name = name;

    const createdTraining = {
      ...createTrainingDto,
      student: { id: createTrainingDto.student_id },
    };

    delete createdTraining.student_id;

    const result = await this.trainingRepository.save(createdTraining);
    const promises = [];

    for (const workout of createTrainingDto.trainingWorkout) {
      const promise = await this.trainingWorkoutService.create({
        training_id: result.id,
        workout_id: workout.workout_id,
        sets: workout.sets,
        repetitions: workout.repetitions,
        order: workout.order,
      });

      promises.push(promise);
    }

    await Promise.all(promises);

    return result;
  }

  private async generateTrainingName(id: string): Promise<string> {
    const count = await this.trainingRepository.count({
      where: { student: { id } },
    });
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (count < alphabet.length) {
      return alphabet.charAt(count);
    } else {
      const letterIndex = Math.floor((count - 1) / alphabet.length);
      const remainder = (count - 1) % alphabet.length;

      return `${alphabet.charAt(letterIndex)}${remainder + 1}`;
    }
  }
  async findTraining(id: string) {
    return await this.trainingRepository.findOne({
      relations: ['trainingWorkout', 'trainingWorkout.workout'],
      where: { id },
    });
  }

  async update(id: string, updateTrainingDto: UpdateTrainingDto) {
    return await this.trainingRepository.update(id, updateTrainingDto);
  }

  async delete(id: string) {
    return await this.trainingRepository.delete(id);
  }
}
