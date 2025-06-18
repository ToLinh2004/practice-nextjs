import fs from 'fs';
import mysql from 'mysql2/promise';
const ca = fs.readFileSync('public/ca.pem');
export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT), // nhớ convert sang số nếu dùng env
  ssl: {
    ca,
  },
});
