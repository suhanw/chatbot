# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=22.7.0
FROM node:${NODE_VERSION}-alpine AS base 

# Dependencies image
FROM base AS dependencies
WORKDIR /usr/src/app
COPY package*.json ./
# Download dependencies as a separate step to take advantage of Docker's caching.
RUN npm install --development
# Copy the rest of the source files into the image.
COPY . .

# Builder image
FROM base AS builder
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ../package*.json ./
# Copy the dependencies from the dependencies image.
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# Copy the rest of the source files into the image.
COPY . .
# Build the server
RUN npm run build:server

#Production image
FROM base AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ../package*.json ./
# Install ONLY production dependencies
RUN npm install --production
# Copy the built server from the builder image.
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD node dist/server.js
