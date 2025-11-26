import { DataSource } from 'typeorm';
import { PositionEntity } from '../position.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'gpsio',
  password: process.env.DB_PASS || 'gpsio123',
  database: process.env.DB_NAME || 'gpsio',
  entities: [PositionEntity],
  synchronize: false, // set true only for development
});
