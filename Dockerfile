FROM node:12.20.1
WORKDIR /workspace/music-app-backend
ADD package*.json ./ 
ADD yarn.lock ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
EXPOSE 4000