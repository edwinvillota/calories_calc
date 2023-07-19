import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { FoodDto } from './dto/food.dto';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private foodsRepository: Repository<Food>,
  ) {}

  private findFoodById(id: number) {
    return this.foodsRepository.findOneBy({ id });
  }

  private getFoodByName(name: string) {
    return this.foodsRepository.findOneBy({ name });
  }

  getFoods() {
    return this.foodsRepository.find();
  }

  async getFoodById(id: number) {
    const food = await this.findFoodById(id);

    if (!food) {
      throw new NotFoundException('Food not found');
    }

    return food;
  }

  async createFood(foodDto: FoodDto) {
    const foodExists = await this.getFoodByName(foodDto.name);

    if (foodExists) {
      throw new BadRequestException('Food already exists');
    }

    const newFood = this.foodsRepository.create(foodDto);

    const createdFood = await this.foodsRepository.save(newFood);

    return createdFood;
  }

  async updateFood(id: number, foodDto: Partial<FoodDto>) {
    const food = await this.findFoodById(id);

    if (!food) {
      throw new BadRequestException('Food not found');
    }

    const updatedFood = await this.foodsRepository.save({
      ...food,
      ...foodDto,
    });

    return updatedFood;
  }

  async deleteFood(id: number) {
    const food = await this.findFoodById(id);

    if (!food) {
      throw new BadRequestException('Food not found');
    }

    await this.foodsRepository.remove(food);

    return true;
  }
}
