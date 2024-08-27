export const KafkaMessage = 'IMO-MESSAGE';

export interface IKafkaParams {
  eventName: string;
  data: any;
}

export enum KafkaTopics {
  AUTH_LOGIN = 'auth-login',
  HEALTH_CHECK = 'health_check',
}

export enum KafkaClient {
  AUTH_SERVICE = 'AUTH-SERVICE',
}

export enum KafkaHealth {
  HEALTHY = 'healthy',
  UN_HEALTHY = 'unhealthy',
  WAITING = 'waiting',
}
