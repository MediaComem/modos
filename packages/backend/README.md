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

# Run the application (the database you configured in .env must already exist).
npm start
```

The API should be available at http://localhost:3000/api.



## Getting started with Docker Compose

To run the development environment in Docker containers, you will need:

* [Docker](https://www.docker.com) 19+
* [Docker Compose](https://docs.docker.com/compose/) 1.25+

Then simply run the application:

```bash
docker-compose up --build
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



## Database management scripts

Example                                            | Description
:------------------------------------------------- | :-------------------------------------------------------------------------------------------------------
`npm run migration:create -- -n UpdateSomeTable`   | Create a new blank database migration.
`npm run migration:generate -- -n UpdateSomeTable` | Automatically generate a new database migration based on schema changes.
`npm run migrate`                                  | Run all pending database migrations.
`npm run rollback`                                 | Roll back the last executed database migration.
`npm run synchronize`                              | Drop and create the database, applying the schema defined by the entities (use **only in development**).
