import { createConnection } from "typeorm";
import "reflect-metadata";

import * as connectionOptions from '../ormconfig';

Promise.resolve().then(migrate).catch(err => console.error(err));

async function migrate() {

  const connection = await createConnection(connectionOptions);
  console.log('Connected to the database');

  await connection.runMigrations({
    transaction: 'all'
  });

  console.log('Database successfully migrated');

  await connection.close();
  console.log('Connection closed');
}
