# FROM node as build
# WORKDIR /app
# COPY ["./weather-app-front/package.json", "./weather-app-front/package-lock.json", "./weather-app-front/src/", "./weather-app-front/public/", "./"]
# RUN npm i && npm run build

FROM node
WORKDIR /app
COPY ./weather-app-backend/package*.json ./
RUN npm i
COPY ./weather-app-backend/ ./
EXPOSE 8888

CMD ["node", "server.js"]
