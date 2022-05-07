FROM node:16-alpine3.14
WORKDIR /app

COPY package.json ./
COPY . .
RUN npm i

CMD ["npm", "start"]