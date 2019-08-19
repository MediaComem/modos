FROM node:8.16.1-alpine

WORKDIR /code

COPY package.json .
RUN npm install --quiet

COPY . .