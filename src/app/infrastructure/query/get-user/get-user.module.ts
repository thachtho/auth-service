import { Module } from '@nestjs/common';
import { GetUser } from './get-user';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({})],
  providers: [GetUser],
  exports: [GetUser],
})
export class GetUserModule {}
