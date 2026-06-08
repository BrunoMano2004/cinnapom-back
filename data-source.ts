import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/**/*.entity.ts', 'dist/**/*.entity.js'],
  migrations: ['src/migrations/*.ts', 'dist/migrations/*.js'],
});
