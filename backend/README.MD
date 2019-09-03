# MoDoS - Early app - Backend

This is the root of the MoDoS's early app backend.

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

The test are using some of the records of the seeders, so don't forget to run
the previous command before trying to launch them.

```bash
$ docker-compose run web npm test
```
