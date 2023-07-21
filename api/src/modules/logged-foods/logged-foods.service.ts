import {
  ConflictException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { LoggedFood } from './entities/logged-food.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodsService } from '../foods/foods.service';
import { MealsService } from '../meals/meals.service';
import { LoggedFoodDto } from './dto/logged-food.dto';

@Injectable()
export class LoggedFoodsService {
  constructor(
    @InjectRepository(LoggedFood)
    private loggedFoodsRepository: Repository<LoggedFood>,
    private foodsService: FoodsService,
    @Inject(forwardRef(() => MealsService))
    private mealsService: MealsService,
  ) {}

  private findLoggedFoodById(id: number) {
    return this.loggedFoodsRepository.findOneBy({ id });
  }

  async getLoggedFoodsByMealId(userId: number, mealId: number) {
    const meal = await this.mealsService.getMealById(userId, mealId);

    if (!meal) {
      throw new ConflictException(`Meal with id ${mealId} not found`);
    }

    return this.loggedFoodsRepository.find({
      where: {
        meal: {
          id: mealId,
        },
      },
    });
  }

  async getLoggedFoodById(userId: number, id: number) {
    const loggedFood = await this.findLoggedFoodById(id);

    if (!loggedFood) {
      throw new ConflictException(`Logged food with id ${id} not found`);
    }

    return loggedFood;
  }

  async addLoggedFoodToMeal(
    userId: number,
    mealId: number,
    loggedFood: LoggedFoodDto,
  ) {
    const meal = await this.mealsService.getMealById(userId, mealId);
    const food = await this.foodsService.getFoodById(loggedFood.food.id!);

    const newLoggedFood = this.loggedFoodsRepository.create({
      ...loggedFood,
      meal,
      food,
    });

    const createdLoggedFood = await this.loggedFoodsRepository.save(
      newLoggedFood,
    );

    return createdLoggedFood;
  }

  async removeLoggedFoodFromMeal(userId: number, mealId: number, id: number) {
    await this.mealsService.getMealById(userId, mealId);
    const loggedFood = await this.findLoggedFoodById(id);

    if (!loggedFood) {
      throw new ConflictException(`Logged food with id ${id} not found`);
    }

    if (+loggedFood.meal_id !== mealId) {
      throw new ConflictException(
        `Logged food with id ${id} not found in meal with id ${mealId}`,
      );
    }

    await this.loggedFoodsRepository.remove(loggedFood);

    return true;
  }
}
