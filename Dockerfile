FROM node:12-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN yarn install

RUN npm run compile

EXPOSE 3000
CMD [ "npm", "start" ]
