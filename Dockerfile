FROM node:12.13-alpine

WORKDIR /usr/src/app

WORKDIR /link_shortering

COPY package.json /link_shortering/package.json

RUN npm install

COPY . /link_shortering

EXPOSE 3000
CMD ["sh", "docker-entrypoint.sh"]
