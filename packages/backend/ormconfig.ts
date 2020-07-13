import { ConnectionOptions } from 'typeorm';

import * as config from './src/config/config';

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  url: config.databaseUrl,
  synchronize: false,
  logging: false,
  entities: [
    "src/entity/**/*.ts"
  ],
  migrations: [
    "src/migration/**/*.ts"
  ],
  subscribers: [
    "src/subscriber/**/*.ts"
  ],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
  }
}

export = connectionOptions;