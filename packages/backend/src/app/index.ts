// 3p
import * as express from 'express';
import * as dotenv from 'dotenv';

async function run() {
  // LOAD ENVIRONMENT VARIABLE FILE
  dotenv.config();

  const app = express();

  app.listen(4000, () => {
    console.log('app launch on http://localhost:4000');
  });
}

run()
// eslint-disable-next-line no-console
  .catch(err => console.log(err));
