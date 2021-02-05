##
## Build Stage
##
FROM node:14.15.1-alpine AS BUILD_IMAGE

RUN mkdir /app

WORKDIR /app

COPY package*.json /app/

# install dependencies
RUN npm install

COPY ./ /app/

RUN npm run build

##
## Run Stage
##
FROM nginx:stable-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=BUILD_IMAGE /app/build /usr/share/nginx/html