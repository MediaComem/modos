# MoDoS Backend

The MoDoS's early app backend is mainly a REST API which is intended to be used
by various front-end (mobile, web, etc...).

## Getting started

in the folder `./backend`, simply run the following commands:

```bash
$ docker-compose run web npm install
$ docker-compose up
```

Your server should be up and running, Yay!

(From now on, the server can be launched with this single command: `docker-compose up`)

## A few link to browse

Once your server is running, you can access:

- ![API reference](http://localhost:3000/api/v1/doc/)
- ![MoDoS landing page](http://localhost:3000/landing-page/index.html)

## Manipulating the database with fake records

By default, the database is totally empty. For the purpose of testing, you may
want to insert some fake record, in order to retrieve them from your client:

```bash
$ docker-compose run web npm run seed
```

/!\ Please, note that this command start by wiping out the database. You should
never run this command in production.

## Configuration

The default configuration is suited for a development environment. However, if
you want to tweak some values (or switch to a production environment), don't
forget to copy the `.env.sample` and modify it according to your needs:

```bash
$ cp .env.sample .env
$ xdg-open .env
```