import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ILogin } from 'src/app/controllers/message/login/login.i';

@Injectable()
export class LoginUseCase {
  constructor(private jwtService: JwtService) {}

  excute(data: ILogin) {
    const { email, password } = data;
    console.log('login usecase', data);
  }
}
