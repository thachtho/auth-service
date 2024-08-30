import { GetUser } from '@infrastructure/query/get-user/get-user';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  Observable,
  catchError,
  forkJoin,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { ILogin } from 'src/app/controllers/message/login/login.i';
import {
  Expires,
  IPayloadCreateToken,
  IResponseLogin,
  LoginMessage,
} from './login.usecase.i';

@Injectable()
export class LoginUseCase {
  constructor(
    private jwtService: JwtService,
    private readonly getUser: GetUser,
  ) {}

  excute(data: ILogin): Observable<any> {
    const { nickname, password } = data;

    return of(null).pipe(
      switchMap(() => {
        return this.getUser.getUserByNickname(nickname).pipe(
          switchMap((res) => {
            const user = res.data;

            if (user) {
              if (user.password !== password) {
                throw new HttpException(
                  LoginMessage.PASS_WORD_INCORRECT,
                  HttpStatus.FORBIDDEN,
                );
              }
              const payload: IPayloadCreateToken = {
                userId: user.id,
                email: user.email,
              };

              return this.createToken(payload);
            }

            throw new HttpException(
              LoginMessage.ACCOUT_INCORRECT,
              HttpStatus.FORBIDDEN,
            );
          }),
        );
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  createToken(payload: IPayloadCreateToken): Observable<IResponseLogin> {
    return forkJoin({
      access_token: this.jwtService.signAsync(payload, {
        expiresIn: Expires.ONE_DAY,
      }),
      refresh_token: this.jwtService.signAsync(payload, {
        expiresIn: Expires.SEVEN_DAY,
      }),
    });
  }
}
