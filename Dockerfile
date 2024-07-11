FROM node:18.19.1

RUN npm i -g @angular/cli

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . . 

CMD [ "ng", "serve", "--host", "0.0.0.0" ]
