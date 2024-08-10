import { kafkaConfig } from '@infrastructure/kafka/kafka.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

export class App {
  static async bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.connectMicroservice(kafkaConfig());
    await app.listen(3000);
    console.log('Kafka connected!');
  }
}
