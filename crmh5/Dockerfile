FROM node:stretch
MAINTAINER ChangFa Hu <hcf1095246249@qq.com>

COPY package.json /tmp/package.json
COPY package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm i npm@latest -g && NPM_CONFIG_LOGLEVEL=warn npm install
COPY . /tmp
RUN cd /tmp && npm run build

FROM nginx
COPY /tmp/dist /usr/share/nginx/html
CMD ["nginx", "-g", "'daemon off;'"]