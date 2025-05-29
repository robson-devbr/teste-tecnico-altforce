FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache bash netcat-openbsd

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
