FROM node:stretch
MAINTAINER ChangFa Hu <hcf1095246249@qq.com>

COPY package.json /tmp/package.json
COPY package-lock.json /tmp/package-lock.json
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install -g eslint-plugin-css-modules
RUN cd /tmp && cnpm install
COPY . /tmp
RUN cd /tmp && npm run build

FROM nginx
COPY /tmp/dist /usr/share/nginx/html
CMD ["nginx", "-g", "'daemon off;'"]