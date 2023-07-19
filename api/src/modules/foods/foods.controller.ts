import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FoodsService } from './foods.service';
import { FoodDto } from './dto/food.dto';

@Controller('/api/v1/foods')
@UseGuards(AuthGuard('jwt'))
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Get()
  getFoods() {
    return this.foodsService.getFoods();
  }

  @Post('create')
  createFood(@Body() food: FoodDto) {
    return this.foodsService.createFood(food);
  }

  @Get(':id')
  getFoodById(@Param('id') id: number) {
    return this.foodsService.getFoodById(id);
  }

  @Put(':id')
  updateFood(@Param('id') id: number, @Body() food: Partial<FoodDto>) {
    return this.foodsService.updateFood(id, food);
  }

  @Delete(':id')
  deleteFood(@Param('id') id: number) {
    return this.foodsService.deleteFood(id);
  }
}
