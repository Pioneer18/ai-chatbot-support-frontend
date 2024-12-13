# Step 1: Build stage
FROM node:16 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm build

# Step 2: Run stage
FROM node:16-slim as run

WORKDIR /app .
COPY --from=build/app

RUN npm install --production

CMD ["npm", "start"]
