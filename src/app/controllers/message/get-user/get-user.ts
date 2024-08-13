import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUser {
  validate() {
    console.log('validate');
  }

  handle() {
    //usecase toi application
    console.log('usecase toi application');
  }
}
