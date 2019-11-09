FROM node:10.6-alpine

EXPOSE 80

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /usr/src/app
COPY . .

RUN npm install

CMD [ "node", "server.js" ]
