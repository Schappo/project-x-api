FROM node:11-alpine

WORKDIR /node-app

COPY package.json .

RUN npm install --quiet

RUN npm install ts-node-dev -g --quiet

COPY . .

EXPOSE 9000

RUN ts-node-dev -r tsconfig-paths/register --respawn --transpile-only src/main.ts