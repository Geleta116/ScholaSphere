FROM node:20

WORKDIR  /usr/src/app   

COPY package*.json ./
COPY . ./

RUN npm install

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start"]

