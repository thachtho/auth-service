import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { IKafkaParams, KafkaEvent, KafkaMessage } from './kafka.controler.i';
import { Login } from './login/login';
import { ILogin } from './login/login.i';

@Controller()
export class KafkaConsumerController {
  constructor(private readonly login: Login) {}

  @EventPattern(KafkaMessage)
  message(@Payload() message: IKafkaParams) {
    return this.handle(message);
  }

  handle(message: IKafkaParams) {
    const { data, eventName } = message;

    switch (eventName) {
      case KafkaEvent.AUTH_LOGIN:
        this.login.handle(data as ILogin);
        break;

      default:
        break;
    }
  }
}
