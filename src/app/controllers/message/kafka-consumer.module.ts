import { Module } from '@nestjs/common';
import { KafkaConsumerController } from './kafka-consumer.controler';
import { LoginModule } from './login/login.module';
import { HealthModule } from './health-check/health-check.module';

@Module({
  imports: [LoginModule, HealthModule],
  controllers: [KafkaConsumerController],
  providers: [],
})
export class KafkaConsumerModule {}
