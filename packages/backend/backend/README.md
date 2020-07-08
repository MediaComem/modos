# MoDoS backend

Steps to run this project:

1. Run `npm ci` command
2. Copy `.env.sample` to `.env` and adjust settings to fit your local environment
3. Run `npm start` command

## Database management scripts

Example                                            | Description
:------------------------------------------------- | :-------------------------------------------------------------------------------------------------------
`npm run migration:create -- -n UpdateSomeTable`   | Create a new blank database migration.
`npm run migration:generate -- -n UpdateSomeTable` | Automatically generate a new database migration based on schema changes.
`npm run migrate`                                  | Run all pending database migrations.
`npm run rollback`                                 | Roll back the last executed database migration.
`npm run synchronize`                              | Drop and create the database, applying the schema defined by the entities (use **only in development**).
