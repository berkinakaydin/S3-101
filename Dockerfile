FROM node:14-alpine
# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "yarn", "run", "start" ]