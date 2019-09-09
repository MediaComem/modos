#! /bin/sh

NODE_ENV=test

node ./bin/www &  # start the server

npx sequelize-cli db:seed:all  # populate database
mocha -u exports test/**/*  # run tests
npx sequelize-cli db:seed:undo:all  # clean database
