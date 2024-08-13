import { Module } from '@nestjs/common';
import { KafkaConsumerController } from './kafka-consumer.controler';
import { LoginModule } from './login/login.module';

@Module({
  imports: [LoginModule],
  controllers: [KafkaConsumerController],
  providers: [],
})
export class KafkaConsumerModule {}
