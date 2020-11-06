# MoDoS Backend

The MoDoS backend is mainly a REST API which is intended to be used by various
front-end (mobile, web, etc...).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Getting started with Node.js](#getting-started-with-nodejs)
- [Getting started with Docker Compose](#getting-started-with-docker-compose)
- [A few links to browse](#a-few-links-to-browse)
- [Configuration](#configuration)
- [Database management scripts](#database-management-scripts)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Prerequisites for local development

### Minimal setup
If you work locally, you have to prepare this minimal database setup for the backend to work correctly.

#### Install mandatory packages
You will need:
- PostgreSQL v.12.4-1
- PostGIS v.3.0 with geos and proj installed
- pgrouting v.2.6.3 with boost v.1.67

The best is to use the dockerized version of the app.

#### Create the postgres database from a psql console:
```SQL 
CREATE DATABASE YOUR_DATABASE_NAME;
```

#### Then install the extensions from a psql console:
⚠ The line below are not needed if your executing the migration.

```SQL
CREATE EXTENSION IF NOT EXISTS adminpack;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
CREATE EXTENSION IF NOT EXISTS tablefunc;
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS pgrouting;
CREATE EXTENSION IF NOT EXISTS citext;
```

#### Add the modos schema
Modos is working with multiple schema but for dev, you specifically need to create a schema call "modos" in the db.
```SQL
CREATE SCHEMA "modos";
```

## Getting started with Node.js

To run the application on your machine, you will need:

* [Node.js](https://nodejs.org) 12
* [PostgreSQL](https://www.postgresql.org) 12+

Then perform the following steps:

```bash
# Install dependencies.
npm ci

# Create .env and adapt it to your environment.
cp .env.sample .env

# Build the application.
npm run build

# Migrate the database to the latest version (the database you configured in
# .env must already exist).
npm run migrate

# Run the application.
npm run dev
```

The API should be available at http://localhost:3000/api.



## Getting started with Docker

To run the development environment in Docker containers, you will need:

* [Docker](https://www.docker.com) 19+
* [Docker Compose](https://docs.docker.com/compose/) 1.25+

Then simply run the application:

```bash
cp .docker.env.sample .docker.env # adapt the database port number to fit an open port in your local environment.
docker-compose --env-file ".docker.env" up --build
```

The API should be available at http://localhost:3000/api.



## A few links to browse

Once your server is running, you can access:

* [API reference](http://localhost:3000/api/v1/doc/)
* [MoDoS landing page](http://localhost:3000/landing-page/index.html)



## Configuration

The default configuration is suited for a development environment. However, if
you want to tweak some values (or switch to a production environment), don't
forget to modify `.env` according to your needs.

Look at `src/config/config.ts` for more information on available configuration
options.



## Scripts

Example         | Description
:-------------- | :---------------------------------------------------------------------------------------------------------
`npm run build` | Compile the application to the `dist` directory.
`npm run dev`   | Run the application in development mode (it will recompile and restart everytime the source code changes).
`npm run start` | Run the compiled application (requires `npm run build` to have been run first).

### Database management

Example                                            | Description
:------------------------------------------------- | :------------------------------------------------------------------------------------------------
`npm run migration:create -- -n UpdateSomeTable`   | Create a new blank database migration.
`npm run migration:generate -- -n UpdateSomeTable` | Automatically generate a new database migration based on schema changes.
`npm run migrate`                                  | Run all pending database migrations (requires `npm run build` to have been run first).
`npm run rollback`                                 | Roll back the last executed database migration (requires `npm run build` to have been run first).

> Note that the `npm run migrate` and `npm run rollback` scripts will work in
> production, while the other migration management scripts can only be used in
> development.

### More

See the `scripts` defined in [`package.json`](./package.json).

