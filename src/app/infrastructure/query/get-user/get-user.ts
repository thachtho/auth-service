import { IUser } from '@application/login/login.usecase.i';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUser {
  constructor(private readonly httpService: HttpService) {}

  getUserByEmail(email: string) {
    return this.httpService.get<IUser>(`http://localhost:5001/user/${email}`);
  }
}
