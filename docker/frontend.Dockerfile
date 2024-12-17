# Stage 1: Build
FROM node:18 AS build
WORKDIR /app

# Copy package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy frontend and backend files
COPY frontend/ .
COPY backend/ .

EXPOSE 5173
# RUN npm run build



