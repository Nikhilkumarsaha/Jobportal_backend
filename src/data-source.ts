import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL, // Use the connection URL from Supabase
  ssl: {
    rejectUnauthorized: false, // You might need this during development
  },
  entities: ['dist//*.entity{.ts,.js}'],
  migrations: ['dist/migrations//*{.ts,.js}'],
  synchronize: false,
});