import { getCurrentSecondTime } from '@common/time';
import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { KafkaHealth } from '../kafka.controler.i';
import { TIME_CHECK_HEALTH } from './health-check.i';

@Injectable()
export class HealthCheck {
  healthStatus = KafkaHealth.WAITING;
  timeLive = getCurrentSecondTime();

  onModuleInit() {
    setInterval(() => {
      this.checkHealth();
      console.log('status:', this.healthStatus);
    }, TIME_CHECK_HEALTH);
  }

  setTimeLive() {
    this.timeLive = getCurrentSecondTime();
    return of(null);
  }

  checkHealth() {
    const currentTime = getCurrentSecondTime();
    const distance = currentTime - this.timeLive;

    if (distance < TIME_CHECK_HEALTH) {
      this.healthStatus = KafkaHealth.HEALTHY;

      return;
    }

    this.healthStatus = KafkaHealth.UN_HEALTHY;
  }
}
