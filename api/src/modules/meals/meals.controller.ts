import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MealsService } from './meals.service';
import { User } from '../auth/decorators/user.decorator';
import { MealDto } from './dto/meal.dto';
import { LoggedFoodDto } from '../logged-foods/dto/logged-food.dto';

@Controller('/api/v1/meals')
@UseGuards(AuthGuard('jwt'))
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Get()
  getMeals(@User('id') userId: number) {
    return this.mealsService.getMealsByUserId(userId);
  }

  @Post('log')
  createMeal(@User('id') userId: number, @Body() meal: MealDto) {
    return this.mealsService.createMeal(userId, meal);
  }

  @Get(':id')
  getMealById(@User('id') userId: number, @Param('id') mealId: number) {
    return this.mealsService.getMealById(userId, mealId);
  }

  @Put(':id')
  updateMeal(
    @User('id') userId: number,
    @Param('id') mealId: number,
    @Body() meal: Partial<MealDto>,
  ) {
    return this.mealsService.updateMeal(userId, mealId, meal);
  }

  @Patch(':id/logged-foods/add')
  addLoggedFoodToMeal(
    @User('id') userId: number,
    @Param('id') mealId: number,
    @Body() loggedFood: LoggedFoodDto,
  ) {
    return this.mealsService.addLoggedFoodToMeal(userId, mealId, loggedFood);
  }

  @Patch(':id/logged-foods/remove/:loggedFoodId')
  removeLoggedFoodFromMeal(
    @User('id') userId: number,
    @Param('id') mealId: number,
    @Param('loggedFoodId') loggedFoodId: number,
  ) {
    return this.mealsService.removeLoggedFoodFromMeal(
      userId,
      mealId,
      loggedFoodId,
    );
  }

  @Delete(':id')
  deleteMeal(@User('id') userId: number, @Param('id') mealId: number) {
    return this.mealsService.deleteMeal(userId, mealId);
  }
}
