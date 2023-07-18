import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConfiguration from './configuration/db-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/.env.development',
      isGlobal: true,
      load: [dbConfiguration],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
