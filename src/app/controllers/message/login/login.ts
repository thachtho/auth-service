import { LoginUseCase } from '@application/login/login.usecase';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ILogin } from './login.i';
import { validator } from '@common/validator';
import { ErrorCustom } from '@common/index';

@Injectable()
export class Login {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  handle(data: ILogin) {
    const valid = this.isValidate(data);

    if (!valid.status) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: valid.errorsMessage,
      });
    }

    return this.loginUseCase.excute(data).pipe(
      catchError((error) => {
        return ErrorCustom.handleError(error);
      }),
    );
  }

  isValidate(message: ILogin) {
    const schema = {
      type: 'object',
      properties: {
        password: { type: 'string' },
        nickname: { type: 'string' },
      },
      required: ['nickname', 'password'],
      additionalProperties: false,
    };

    return validator(message, schema);
  }
}
