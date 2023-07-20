import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nestjs-course',
  synchronize: false,
  autoLoadEntities: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations'
  }
} as DataSourceOptions;

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
