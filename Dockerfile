FROM node

WORKDIR /var/www/html

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server"]
