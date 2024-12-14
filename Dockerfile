# Step 1: Build stage
FROM node:18 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Run stage
FROM node:18-slim as run

WORKDIR /app
COPY --from=build /app .

RUN npm install --production

CMD ["npm", "start"]
