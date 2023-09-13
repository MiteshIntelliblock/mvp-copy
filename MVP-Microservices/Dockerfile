FROM node:18.12.1

WORKDIR /app/userservice

# COPY package*.json ./
COPY package*.json /app/userservice


RUN npm install 

COPY . .

EXPOSE 8001

CMD [ "npm", "start" ]
