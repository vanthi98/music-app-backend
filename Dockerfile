FROM node:12.20.1

WORKDIR /workspace/music-app-backend

ADD package*.json ./ 

ADD yarn.lock ./

RUN npm install

COPY . .

ENTRYPOINT ["sh", "./entrypoint.sh"]

EXPOSE 4000

