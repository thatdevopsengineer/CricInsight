FROM node:18 AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
EXPOSE 5173
RUN npm run build
