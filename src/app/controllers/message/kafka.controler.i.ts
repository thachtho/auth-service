export const KafkaMessage = 'IMO-AUTH';

export interface IKafkaParams {
  eventName: string;
  data: any;
}

export enum KafkaEvent {
  AUTH_LOGIN = 'auth-login',
}
