FROM node:10.6-alpine

EXPOSE 80

WORKDIR /usr/src/app
COPY node_modules/ node_modules/
COPY public/css/ public/css/
COPY data/ data/
COPY index.js .

CMD [ "node", "index.js" ]
