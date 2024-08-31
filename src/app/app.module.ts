import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import DatabaseModule from 'src/app/infrastructure/common/database/database.module';
import { KafkaConsumerModule } from './controllers/message/kafka-consumer.module';
import { ConfigModule as ConfigServiceCustom } from './config/config.service.module';
import { ENV } from './config/config.i';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get(ENV.DB_HOST),
        port: configService.get(ENV.DB_PORT),
        user: configService.get(ENV.DB_USERNAME),
        password: configService.get(ENV.DB_PASSWORD),
        database: configService.get(ENV.DB_DATABASE),
      }),
    }),
    KafkaConsumerModule,
    ConfigServiceCustom,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
