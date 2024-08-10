import { getUser } from '@domain/services/sql/get-user';
import DatabaseService from '@infrastructure/database/database.service';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IUser } from './user.service.i';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  getUser(userId: number): Observable<IUser[]> {
    return this.databaseService.runQuery(getUser, [userId]).pipe(
      map((res) => {
        return res.rows;
      }),
    );
  }
}
