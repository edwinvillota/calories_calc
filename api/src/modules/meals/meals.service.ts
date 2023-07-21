import {
  ConflictException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Meal } from './entities/meal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { MealDto } from './dto/meal.dto';

import { LoggedFoodsService } from '../logged-foods/logged-foods.service';
import { FoodsService } from '../foods/foods.service';
import { LoggedFoodDto } from '../logged-foods/dto/logged-food.dto';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private mealsRepository: Repository<Meal>,
    private usersService: UsersService,
    private foodsService: FoodsService,
    @Inject(forwardRef(() => LoggedFoodsService))
    private loggedFoodsService: LoggedFoodsService,
  ) {}

  private findMealById(id: number, userId: number) {
    return this.mealsRepository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });
  }

  getMealsByUserId(userId: number) {
    return this.mealsRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  getMealsByUserIdAndDate(userId: number, date: Date) {
    return this.mealsRepository.find({
      where: {
        user: {
          id: userId,
        },
        log_date: date,
      },
    });
  }

  async getMealById(userId: number, mealId: number) {
    const meal = await this.findMealById(mealId, userId);

    if (!meal) {
      throw new ConflictException(`Meal with id ${mealId} not found`);
    }

    return meal;
  }

  async createMeal(userId: number, meal: MealDto) {
    await this.usersService.getUserById(userId);

    for (const loggedFood of meal.logged_foods) {
      console.log({ loggedFood });

      const foodExists = await this.foodsService.getFoodById(
        loggedFood.food.id!,
      );

      if (!foodExists) {
        throw new ConflictException(
          `Food with id ${loggedFood.food.id} not found`,
        );
      }
    }

    const newMeal = this.mealsRepository.create({
      ...meal,
      user: {
        id: userId,
      },
    });

    const createdMeal = await this.mealsRepository.save(newMeal);
    return createdMeal;
  }

  async updateMeal(userId: number, id: number, meal: Partial<MealDto>) {
    const mealExists = await this.findMealById(id, userId);

    if (!mealExists) {
      throw new ConflictException(`Meal with id ${id} not found`);
    }

    if (meal.logged_foods) {
      for (const loggedFood of meal.logged_foods) {
        const foodExists = await this.foodsService.getFoodById(
          loggedFood.food.id!,
        );

        if (!foodExists) {
          throw new ConflictException(
            `Food with id ${loggedFood.food.id} not found`,
          );
        }
      }
    }

    const updatedMeal = await this.mealsRepository.save({
      ...mealExists,
      ...meal,
    });

    return updatedMeal;
  }

  async addLoggedFoodToMeal(
    userId: number,
    mealId: number,
    loggedFood: LoggedFoodDto,
  ) {
    return this.loggedFoodsService.addLoggedFoodToMeal(
      userId,
      mealId,
      loggedFood,
    );
  }

  async removeLoggedFoodFromMeal(userId: number, mealId: number, id: number) {
    return this.loggedFoodsService.removeLoggedFoodFromMeal(userId, mealId, id);
  }

  async deleteMeal(userId: number, mealId: number) {
    const meal = await this.findMealById(mealId, userId);

    if (!meal) {
      throw new ConflictException(`Meal with id ${mealId} not found`);
    }

    if (meal.user.id !== userId) {
      throw new ConflictException(`Meal with id ${mealId} not found`);
    }

    await this.mealsRepository.remove(meal);

    return true;
  }
}
