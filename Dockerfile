ARG NODE_VERSION="16.15.1"

FROM node:${NODE_VERSION}-buster-slim AS base

WORKDIR /srv/todo-app
COPY package.json package-lock.json ./
RUN npm ci
COPY --chown=node:node . .
USER node
ENV NODE_ENV="production"
CMD ["node",  "."]
