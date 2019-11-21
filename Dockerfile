FROM node:10.6-alpine

EXPOSE 80

WORKDIR /usr/src/app

COPY . .

CMD [ "node", "index.js" ]
