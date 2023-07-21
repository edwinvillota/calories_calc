import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfiguration from './modules/configuration/db-configuration';
import authConfiguration from './modules/configuration/auth-configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { FoodsModule } from './modules/foods/foods.module';
import { ExerciseActivitiesModule } from './modules/exercise-activities/exercise-activities.module';
import { MealsModule } from './modules/meals/meals.module';

import { LoggedFoodsModule } from './modules/logged-foods/logged-foods.module';
import { ExercisesModule } from './modules/exercises/exercises.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfiguration, authConfiguration],
      envFilePath: './env/development.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('postgres.host'),
        port: configService.get<number>('postgres.port'),
        username: configService.get<string>('postgres.user'),
        password: configService.get<string>('postgres.password'),
        database: configService.get<string>('postgres.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        debug: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    FoodsModule,
    ExerciseActivitiesModule,
    MealsModule,
    LoggedFoodsModule,
    ExercisesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
