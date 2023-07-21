import { Module, forwardRef } from '@nestjs/common';
import { LoggedFoodsController } from './logged-foods.controller';
import { LoggedFoodsService } from './logged-foods.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggedFood } from './entities/logged-food.entity';
import { FoodsModule } from '../foods/foods.module';
import { MealsModule } from '../meals/meals.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoggedFood]),
    FoodsModule,
    forwardRef(() => MealsModule),
  ],
  controllers: [LoggedFoodsController],
  providers: [LoggedFoodsService],
  exports: [LoggedFoodsService],
})
export class LoggedFoodsModule {}
