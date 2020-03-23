FROM node:alpine

WORKDIR /usr/appa

ENV PATH /usr/appa/node_modules/.bin:$PATH

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["npm","start"]

