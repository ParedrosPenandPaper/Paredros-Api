FROM node:10.6-alpine

EXPOSE 80

WORKDIR /usr/src/app
COPY node_modules/ node_modules/
COPY css/ css/
COPY server.js .

CMD [ "node", "server.js" ]
