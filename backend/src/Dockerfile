FROM node:20 AS node-builder
RUN mkdir /build
WORKDIR /build
COPY package-lock.json package.json ./
RUN npm ci
COPY . .

FROM alpine:3.19
RUN apk add --update nodejs bash
RUN addgroup -S node && adduser -S node -G node
USER node
RUN mkdir /home/node/code
WORKDIR /home/node/code
COPY --from=node-builder --chown=node:node /build .

# Make the entrypoint script executable
USER root
RUN chmod +x docker-entrypoint.sh
USER node

EXPOSE 4000
CMD ["sh", "docker-entrypoint.sh"]