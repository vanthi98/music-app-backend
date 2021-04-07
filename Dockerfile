FROM node:12.20.1

WORKDIR /workspace/music-app-backend

ADD package*.json ./ 

ADD yarn.lock ./

RUN npm install

COPY . .

RUN chmod +x entrypoint.sh

EXPOSE 4000

CMD ["./entrypoint.sh"]

