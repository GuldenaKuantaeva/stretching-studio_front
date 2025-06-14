FROM node:18-alpine

RUN adduser -S -s /bin/sh -D prod

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 80

USER prod

CMD ["node", "/app/.output/server/index.mjs"]