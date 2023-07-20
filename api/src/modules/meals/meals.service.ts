import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Meal } from './entities/meal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { MealDto } from './dto/meal.dto';
import { FoodsService } from '../foods/foods.service';
import { FoodDto } from '../foods/dto/food.dto';
import { Food } from '../foods/entities/food.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private mealsRepository: Repository<Meal>,
    private usersService: UsersService,
    private foodsService: FoodsService,
  ) {}

  private findMealById(id: number) {
    return this.mealsRepository.findOneBy({ id });
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
    const meal = await this.findMealById(mealId);

    console.log({ meal });

    if (meal?.user.id !== userId) {
      throw new NotFoundException(`Meal with id ${mealId} not found`);
    }

    return meal;
  }

  async createMeal(userId: number, meal: MealDto) {
    const user = await this.usersService.getUserById(userId);

    if (!user) {
      throw new ConflictException(`User with id ${userId} not found`);
    }

    for (const food of meal.foods) {
      const foodExists = await this.foodsService.getFoodById(food.id!);

      if (!foodExists) {
        throw new ConflictException(`Food with id ${food.id} not found`);
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
    const mealExists = await this.findMealById(id);

    if (!mealExists) {
      throw new ConflictException(`Meal with id ${id} not found`);
    }

    if (mealExists.user.id !== userId) {
      throw new ConflictException(`Meal with id ${id} not found`);
    }

    if (meal.foods) {
      for (const food of meal.foods) {
        const foodExists = await this.foodsService.getFoodById(food.id!);

        if (!foodExists) {
          throw new ConflictException(`Food with id ${food.id} not found`);
        }
      }
    }

    const updatedMeal = await this.mealsRepository.save({
      ...mealExists,
      ...meal,
    });

    return updatedMeal;
  }

  async deleteMeal(userId: number, mealId: number) {
    const meal = await this.findMealById(mealId);

    if (!meal) {
      throw new ConflictException(`Meal with id ${mealId} not found`);
    }

    if (meal.user.id !== userId) {
      throw new ConflictException(`Meal with id ${mealId} not found`);
    }

    await this.mealsRepository.remove(meal);

    return true;
  }

  async addFoodsToMeal(userId: number, mealId: number, foods: FoodDto[]) {
    const meal = await this.findMealById(mealId);

    if (!meal) {
      throw new ConflictException(`Meal with id ${mealId} not found`);
    }

    if (meal.user.id !== userId) {
      throw new ConflictException(`Meal with id ${mealId} not found`);
    }

    const foodsToAdd = [];

    for (const food of foods) {
      const foodExists = await this.foodsService.getFoodById(food.id!);
      foodsToAdd.push(foodExists);
    }

    meal.foods = [...meal.foods, ...foodsToAdd];

    const updatedMeal = await this.mealsRepository.save(meal);

    return updatedMeal;
  }

  async removeFoodsFromMeal(userId: number, mealId: number, foods: FoodDto[]) {
    const meal = await this.findMealById(mealId);

    if (!meal) {
      throw new ConflictException(`Meal with id ${mealId} not found`);
    }

    if (meal.user.id !== userId) {
      throw new ConflictException(`Meal with id ${mealId} not found`);
    }

    const foodsToRemove: Food[] = [];

    for (const food of foods) {
      const foodExists = await this.foodsService.getFoodById(food.id!);
      foodsToRemove.push(foodExists);
    }

    meal.foods = meal.foods.filter(
      (food) => !foodsToRemove.find((f) => f.id === food.id),
    );

    const updatedMeal = await this.mealsRepository.save(meal);

    return updatedMeal;
  }
}
