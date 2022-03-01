FROM node:16.5.0

RUN npm i -g npm@7.24.0

RUN mkdir -p /code/node_modules && chown -R node:node /code

WORKDIR /code

COPY --chown=node:node package*.json ./

RUN npm install

USER node

COPY --chown=node:node . .

RUN npm run build

CMD cp -r build/* host-build/
