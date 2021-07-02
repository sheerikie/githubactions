FROM node:12.18-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "run", "serve"]