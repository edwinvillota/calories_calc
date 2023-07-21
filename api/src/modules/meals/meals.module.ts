import { Module, forwardRef } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { UsersModule } from '../users/users.module';
import { LoggedFoodsModule } from '../logged-foods/logged-foods.module';
import { FoodsModule } from '../foods/foods.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meal]),
    UsersModule,
    FoodsModule,
    forwardRef(() => LoggedFoodsModule),
  ],
  providers: [MealsService],
  controllers: [MealsController],
  exports: [MealsService],
})
export class MealsModule {}
