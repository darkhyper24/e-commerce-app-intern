
# build stage
# Use a multi-stage build to keep the final image small
# First stage: build the Node.js application
FROM node:20 AS node-builder
RUN mkdir /build
WORKDIR /build
COPY package-lock.json package.json ./
RUN npm ci
COPY . .

# production stage
# Use a minimal base image for the final application
# Copy the built application from the previous stage
FROM alpine:3.19
RUN apk add --update nodejs
RUN addgroup -S node && adduser -S node -G node
USER node
RUN mkdir /home/node/code
WORKDIR /home/node/code
COPY --from=node-builder --chown=node:node /build .

# Fun fact: EXPOSE is not required for the container to run, but it is a good practice to document which ports are intended to be exposed (supposedly)
EXPOSE 4000
CMD ["node", "server.js"]
