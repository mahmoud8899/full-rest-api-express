FROM node:alpine
COPY package.json .
WORKDIR /app
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]