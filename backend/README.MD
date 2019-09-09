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

If you want to have some example records in the database, simply run the
following command:

```bash
$ docker-compose run web npx sequelize-cli db:seed:all
```

Note that, each time you restart the containers, every table is dropped and
recreated. Therefore this command should be rerun if you still want some records.

## Running the tests

There is nothing to worry about the database since the tests are run with a
test database, which is populated and cleaned on the fly when the tests start/stop.

```bash
$ docker-compose run web npm test
```
