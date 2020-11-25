# MoDoS Backend

The MoDoS backend is mainly a REST API which is intended to be used by various
front-end (mobile, web, etc...).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Getting started with Docker](#getting-started-with-docker)
- [Getting started with Node.js](#getting-started-with-nodejs)
- [A few links to browse](#a-few-links-to-browse)
- [Configuration](#configuration)
- [Scripts](#scripts)
  - [Database management](#database-management)
  - [More](#more)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## Getting started with Docker

Make sure to install the following requirements:

* [Docker](https://www.docker.com) 19+
* [Docker Compose](https://docs.docker.com/compose/) 1.27+

Then perform the following steps:

```bash
# Create .env and adapt it to your environment if necessary. The default settings should
# work out of the box.
cp .env.sample .env

# Run the application.
docker-compose up --build
```

The API should be available at http://localhost:3000/api.



## Getting started with Node.js

Make sure to install the following requirements:

* [Node.js](https://nodejs.org) 12
* [PostgreSQL](https://www.postgresql.org) 12 with:
  * [PostGIS](https://postgis.net) 3.0 with geos and proj installed
  * [pgRouting](https://pgrouting.org) 2.6

You will also need to create a database with a schema named `modos` in your PostgreSQL
cluster:

```bash
CREATE DATABASE modos;
\connect modos
CREATE SCHEMA modos;
```

Then perform the following steps:

```bash
# Install dependencies.
npm ci

# Create .env and adapt it to your environment, notably the $MODOS_DATABASE_URL variable.
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



## A few links to browse

Once your server is running, you can access:

* [API reference](http://localhost:3000/api/v1/doc/)
* [MoDoS landing page](http://localhost:3000/landing-page/index.html)



## Configuration

The default configuration is suited for a development environment. However, if you want to
tweak some values (or switch to a production environment), you can modify `.env` according
to your needs.

Look at `src/config/config.ts` for more information on available configuration options.



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

After the migrations have taken place, you need to refresh a view using this SQL query:
```
REFRESH MATERIALIZED VIEW "modos"."network_convex_hull_v";
```
