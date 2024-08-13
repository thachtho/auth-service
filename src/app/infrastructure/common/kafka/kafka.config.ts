import { Transport } from '@nestjs/microservices';

export const kafkaConfig = () => {
  const kafkaHost = process.env.KAFKA_HOST;
  const kafkaPort = process.env.KAFKA_PORT;

  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [`${kafkaHost}:${kafkaPort}`],
      },
    },
  };
};
