# Use a multi-stage build to keep the image small
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/
RUN npm install
COPY . .
RUN npm run build --prefix client
RUN npm run build --prefix server

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/server/package*.json ./server/
COPY --from=build /app/server/dist ./server/dist
RUN npm install --prefix server --production
COPY --from=build /app/client/dist ./client/dist
EXPOSE 5000
CMD ["node", "server/dist/index.js"]
