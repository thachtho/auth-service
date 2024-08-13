import { kafkaConfig } from 'src/app/infrastructure/common/kafka/kafka.config';
import { NestFactory } from '@nestjs/core';

export class App {
  static async bootstrap(module: any) {
    const port = process.env.PORT || 5000;
    const app = await NestFactory.create(module);
    app.connectMicroservice(kafkaConfig());
    await app.startAllMicroservices();
    await app.listen(port);
    console.log('Kafka connected!');
  }
}
