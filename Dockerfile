FROM node:10

MAINTAINER reposibot@repositive.io

ENV NODE_ENV docker

WORKDIR /opt

COPY . ./

EXPOSE 3000

CMD npm start
