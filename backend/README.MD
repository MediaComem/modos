# MoDoS - Early app - Backend

The MoDoS's early app backend is mainly a REST API which is intended to be used
by various front-end (mobile, web, etc...).

## Getting started

Simply run the following command:

```bash
$ docker-compose up
```

It might fail the first time, because the server tries to connect to the
database, which is not entirely ready. Don't worry, just relaunch the command
and everything should be fine.

## Populate the database with the seeders

Some example values are inserted into the database by default. Currently,
it happens to fail sometimes (see #12). If that's the case, simple relaunch the
containers until everything's fine.

Note that, each time you restart the containers, every table is dropped and
recreated for now.

## Configuration

To use a custom configuration, copy `backend/.env.sample` to `backend/.env`,
then uncomment and change the relevant properties. This new file will be ignored
in the repository.

> See https://www.npmjs.com/package/dotenv.

<!-- ## Running the tests

There is nothing to worry about the database since the tests are run with a
test database, which is populated and cleaned on the fly when the tests start/stop.

```bash
$ docker-compose run web npm test
``` -->
