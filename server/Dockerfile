FROM node:11-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
RUN npm i -g yarn
RUN npm i -g nodemon
RUN yarn install
COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]
