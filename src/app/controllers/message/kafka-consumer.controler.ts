import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { HealthCheck } from './health-check/health-check';
import { IKafkaParams, KafkaEvent, KafkaMessage } from './kafka.controler.i';
import { Login } from './login/login';
import { ILogin } from './login/login.i';

@Controller()
export class KafkaConsumerController {
  constructor(
    private readonly login: Login,
    private readonly healthCheck: HealthCheck,
  ) {}

  @MessagePattern(KafkaMessage)
  message(@Payload() message: IKafkaParams): Observable<any> {
    return this.handle(message);
  }

  handle(message: IKafkaParams): Observable<any> {
    const { data, eventName } = message;

    switch (eventName) {
      case KafkaEvent.AUTH_LOGIN:
        return this.login.handle(data as ILogin);
      case KafkaEvent.HEALTH_CHECK:
        return this.healthCheck.setTimeLive();

      default:
        break;
    }
  }
}
