import { sync as globSync } from 'fast-glob';
import { join as joinPath } from 'path';
import { ConnectionOptions } from 'typeorm';

import { databaseUrl, typeormLogging } from './config/config';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  url: databaseUrl,
  synchronize: false,
  logging: typeormLogging,
  entities: findAppFiles('entity/*.[jt]s'),
  migrations: findAppFiles('migration/*.[jt]s'),
  subscribers: findAppFiles('subscriber/*.[jt]s'),
  cli: {
    entitiesDir: joinPath(__dirname, 'entity'),
    migrationsDir: joinPath(__dirname, 'migration'),
    subscribersDir: joinPath(__dirname, 'subscriber')
  }
};

export = connectionOptions;

function findAppFiles(pattern) {
  return globSync(pattern, { absolute: true, cwd: __dirname });
}
