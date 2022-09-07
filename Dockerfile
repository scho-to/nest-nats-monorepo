FROM node:lts-alpine as setup

WORKDIR /app

COPY --chown=node:node . .

USER node

FROM setup as dev

CMD ["npm", "run", "start:dev"]

FROM setup as prod

RUN yarn install && npm run build

CMD ["npm", "run", "start:prod"]