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
        email: {
          type: 'string',
          pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
          errorMessage: {
            pattern: 'Email không đúng định dạng!.',
          },
        },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
      additionalProperties: false,
    };

    return validator(message, schema);
  }
}
