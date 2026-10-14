import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { Painting } from './painting.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'paintings',
  
});

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async paintingsDb(){
    const [results] = await mysqlConnection.execute('SELECT COUNT(*) AS db FROM paintings');
    const rows = results as { db: number }[];
    return rows[0].db;
  }

  async paintingsList(minYear: number) {
    const [results] = await mysqlConnection.execute('SELECT id, title, painter, painted_at FROM paintings WHERE painted_at >= ? ORDER BY painted_at DESC', [minYear]);
    const rows = results as Painting[];
    return rows;
  }
}
