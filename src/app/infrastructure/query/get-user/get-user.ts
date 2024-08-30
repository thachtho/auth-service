import { IUser } from '@application/login/login.usecase.i';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CON_FIG } from 'src/asset/conf/config';

@Injectable()
export class GetUser {
  private userHost: null | string;

  constructor(private readonly httpService: HttpService) {
    this.userHost = CON_FIG.request.userService;
  }

  getUserByNickname(nickname: string) {
    return this.httpService.get<IUser>(
      `${this.userHost}/users/find-by-nickname/${nickname}`,
    );
  }
}
