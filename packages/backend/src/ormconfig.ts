import { sync as globSync } from 'fast-glob';
import { join as joinPath, relative as relativePath } from 'path';
import { ConnectionOptions } from 'typeorm';

import { databaseUrl, root, typeormLogging } from './config/config';

const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    url: databaseUrl,
    schema: 'modos',
    synchronize: false,
    logging: typeormLogging,
    entities: findAppFiles('entity/*.[jt]s'),
    migrations: findAppFiles('migration/*.[jt]s'),
    subscribers: findAppFiles('subscriber/*.[jt]s'),
    cli: {
        entitiesDir: relativePath(root, joinPath(__dirname, 'entity')),
        migrationsDir: relativePath(root, joinPath(__dirname, 'migration')),
        subscribersDir: relativePath(root, joinPath(__dirname, 'subscriber'))
    }
};

export = connectionOptions;

function findAppFiles(pattern) {
    return globSync(pattern, { absolute: true, cwd: __dirname });
}
