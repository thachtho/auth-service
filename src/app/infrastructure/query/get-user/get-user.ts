import { IUser } from '@application/login/login.usecase.i';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/app/config/config.service';

@Injectable()
export class GetUser {
  private userHost: null | string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.userHost = this.configService.userHost;
  }

  getUserByNickname(nickname: string) {
    return this.httpService.get<IUser>(
      `${this.userHost}/users/find-by-nickname/${nickname}`,
    );
  }
}
