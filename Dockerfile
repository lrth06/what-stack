FROM node:14-alpine

WORKDIR /usr/src/app

COPY package.json .


RUN npm install --production


COPY .  .

EXPOSE 5000

CMD [ "node", "index.js" ]