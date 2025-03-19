FROM node:22.11.0

RUN npm i -g npm@11.2.0

RUN mkdir -p /code/node_modules && chown -R node:node /code

WORKDIR /code

COPY --chown=node:node package*.json ./

RUN npm install --engine-strict

USER node

COPY --chown=node:node . .

RUN npm run build

CMD cp -r build/* host-build/
