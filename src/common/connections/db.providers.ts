import { createConnection } from 'typeorm';
import { Config } from '../config';
import { LINK_SHORTENING__DB } from '../di_registry';

export const providers = [
  {
    provide: LINK_SHORTENING__DB,
    useFactory: async (config: Config) => {
      const {
        database,
        username,
        password,
        host = 'localhost',
        port = 5432,
      } = config.get('postgres');
      return await createConnection({
        type: 'postgres',
        host,
        port,
        username,
        password,
        database,
        entities: [`${__dirname}/../../**/*.entity{.ts,.js}`],
        migrations: [`${__dirname}/../../migrations/*{.ts,.js}`],
        cli: {
          migrationsDir: 'migration',
        },
      });
    },
    inject: [Config],
  },
];
