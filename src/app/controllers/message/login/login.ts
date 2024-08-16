import { LoginUseCase } from '@application/login/login.usecase';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ILogin } from './login.i';
import { validator } from '@common/validator';

@Injectable()
export class Login {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  handle(data: ILogin) {
    const valid = this.isValidate(data);

    if (!valid) {
      return;
    }

    return this.loginUseCase.excute(data).pipe(
      catchError((error) => {
        if (error?.status) {
          throw new RpcException({
            statusCode: error.status,
            message: error.response,
          });
        }

        throw new RpcException(error.response.data);
      }),
    );
  }

  isValidate(message: ILogin) {
    const schema = {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
      additionalProperties: false,
    };

    return validator(message, schema);
  }
}
