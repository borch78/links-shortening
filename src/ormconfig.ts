import * as config from 'config';
const {
  database,
  username,
  password,
  host = 'localhost',
  port = 5432,
} = config.get('postgres');

export = {
  name: 'link_shortering',
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  cli: {
    migrationsDir: 'dist/migrations',
  },
  entities: ['./dist/**/*.entity{.ts,.js}'],
  migrations: ['./dist/migrations/*{.ts,.js}'],
};
