FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY . .

EXPOSE 3000
CMD ["node", "src/index.js"]
