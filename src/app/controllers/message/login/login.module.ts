import { Module } from '@nestjs/common';
import { Login } from './login';
import { LoginUseCaseModule } from '@application/login/login.usecase.module';

@Module({
  imports: [LoginUseCaseModule],
  providers: [Login],
  exports: [Login],
})
export class LoginModule {}
