import { createConnection } from "typeorm";
import "reflect-metadata";

import * as connectionOptions from '../ormconfig';

Promise.resolve().then(rollback).catch(err => console.error(err));

async function rollback() {

  const connection = await createConnection(connectionOptions);
  console.log('Connected to the database');

  await connection.undoLastMigration({
    transaction: 'all'
  });

  console.log('Last database migration successfully rolled back');

  await connection.close();
  console.log('Connection closed');
}
