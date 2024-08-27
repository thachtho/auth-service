import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { HealthCheck } from './health-check/health-check';
import { KafkaTopics } from './kafka.controler.i';
import { Login } from './login/login';
import { ILogin } from './login/login.i';

@Controller()
export class KafkaConsumerController {
  constructor(
    private readonly login: Login,
    private readonly healthCheck: HealthCheck,
  ) {}

  @MessagePattern(KafkaTopics.AUTH_LOGIN)
  hanleLogin(@Payload() message): Observable<any> {
    return this.login.handle(message as ILogin);
  }

  @MessagePattern(KafkaTopics.HEALTH_CHECK)
  handleHealthCheck(): Observable<any> {
    return this.healthCheck.setTimeLive();
  }
}
