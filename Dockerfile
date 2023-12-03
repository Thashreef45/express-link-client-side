FROM node:18

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN npm install -g serve

CMD [ "serve","-s","-p","5000","dist" ]

EXPOSE 5000