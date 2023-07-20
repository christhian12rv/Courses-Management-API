import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nestjs-course',
  synchronize: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
} as DataSourceOptions;

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
