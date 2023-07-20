import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { UsersModule } from '../users/users.module';
import { FoodsModule } from '../foods/foods.module';

@Module({
  imports: [TypeOrmModule.forFeature([Meal]), UsersModule, FoodsModule],
  providers: [MealsService],
  controllers: [MealsController],
})
export class MealsModule {}
