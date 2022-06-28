FROM node:16-alpine3.16

WORKDIR /app

COPY docker .

RUN npm install

CMD [ "npm", "run", "start" ]
