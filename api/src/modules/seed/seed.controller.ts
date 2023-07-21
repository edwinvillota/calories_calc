import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('/api/v1/seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('purge')
  purge() {
    return this.seedService.purge();
  }

  @Post('seed')
  seed() {
    return this.seedService.seed();
  }
}
