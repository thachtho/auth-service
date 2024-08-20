import { Module } from '@nestjs/common';
import { HealthCheck } from './health-check';

@Module({
  imports: [],
  controllers: [],
  providers: [HealthCheck],
  exports: [HealthCheck],
})
export class HealthModule {}
