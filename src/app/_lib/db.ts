import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { writeCaPemIfNotExists } from '@/app/_lib/initCaPem';
writeCaPemIfNotExists();
// Đường dẫn chính xác đến file ca.pem
const ca = fs.readFileSync(path.join(process.cwd(), 'src','app', 'certs', 'ca.pem'));

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: {
    ca,
  },
});
