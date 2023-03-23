FROM node:18.15.0

RUN npm i -g npm@9.6.2

RUN mkdir -p /code/node_modules && chown -R node:node /code

WORKDIR /code

COPY --chown=node:node package*.json ./

RUN npm install

USER node

COPY --chown=node:node . .

RUN npm run build

CMD cp -r build/* host-build/
