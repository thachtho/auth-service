import { Module } from '@nestjs/common';
import { LoginUseCase } from './login-usecase';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './login.usecase.i';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      // signOptions: { expiresIn: 24 * 60 * 60 },
    }),
  ],
  providers: [LoginUseCase],
  exports: [LoginUseCase],
})
export class LoginUseCaseModule {}
