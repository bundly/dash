FROM node:11-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm i -g yarn
RUN npm i -g nodemon
RUN yarn install

EXPOSE 5000

CMD ["npm", "run", "start"]
