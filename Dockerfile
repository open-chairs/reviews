FROM node:11

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

RUN apt-get update

RUN apt-get -y install vim

EXPOSE 3004

CMD [ "npm", "start" ]