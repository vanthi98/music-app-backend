FROM node:12.20.1

WORKDIR /workspace/music-app-backend

ADD package*.json ./ 

ADD yarn.lock ./

RUN npm install

ENV GRAPHQL_PLAYGROUND=true

COPY . .

ENTRYPOINT ["sh", "./entrypoint.sh"]

EXPOSE 4000

