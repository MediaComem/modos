FROM node:12.10.0

WORKDIR /code

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]