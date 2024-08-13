import { LoginUseCase } from '@application/login/login-usecase';
import { Injectable } from '@nestjs/common';
import { ILogin } from './login.i';

@Injectable()
export class Login {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  handle(data: ILogin) {
    this.validate();
    //usecase toi application

    return this.loginUseCase.excute(data);
  }

  validate() {
    console.log('validate');
  }
}
