FROM node:18-alpine

RUN cd /home/node
RUN mkdir project

USER node

WORKDIR /home/node/project

EXPOSE 3000