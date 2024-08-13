import { Module } from '@nestjs/common';
import { GetUser } from './get-user';

@Module({
  imports: [],
  providers: [GetUser],
})
export class GetUserModule {}
