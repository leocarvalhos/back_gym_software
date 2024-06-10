import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  async create(createPlanDto: CreatePlanDto) {
    const checkPlan = await this.planRepository.findOneBy({
      name: createPlanDto.name,
    });

    if (checkPlan) throw new BadRequestException('O plano já existe!');

    await this.planRepository.save(createPlanDto);

    return createPlanDto;
  }

  async findAll() {
    const allPlans = await this.planRepository.find({
      order: {
        name: 'ASC',
      },
    });

    return allPlans;
  }

  async findOneByID(id: string) {
    const plan = await this.planRepository.findOneByOrFail({ id });

    return plan;
  }

  async update(id: string, updatePlanDto: UpdatePlanDto) {
    return await this.planRepository.update(id, updatePlanDto);
  }

  async delete(id: string) {
    return await this.planRepository.delete(id);
  }
}
