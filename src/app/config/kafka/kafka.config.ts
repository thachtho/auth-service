import { Transport } from '@nestjs/microservices';
import { KafkaConfig } from './kafka.i';

export const kafkaConfig = () => {
  const kafkaHost = process.env.KAFKA_HOST;
  const kafkaPort = process.env.KAFKA_PORT;

  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: KafkaConfig.CLIENT_ID,
        brokers: [`${kafkaHost}:${kafkaPort}`],
      },
      consumer: {
        groupId: KafkaConfig.GROUP_ID,
      },
    },
  };
};
