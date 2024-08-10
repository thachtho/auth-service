import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { CONNECTION_POOL } from './database.module-definition';
import { from } from 'rxjs';

@Injectable()
class DatabaseService {
  constructor(@Inject(CONNECTION_POOL) private readonly pool: Pool) {}

  runQuery(query: string, params?: unknown[]) {
    return from(this.pool.query(query, params));
  }
}

export default DatabaseService;
