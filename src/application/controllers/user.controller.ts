import { UserService } from '@domain/services/user.service';
import { IUser } from '@domain/services/user.service.i';
import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  get(): Observable<IUser[]> {
    return this.userService.getUser(1);
  }
}
