FROM node:stretch AS build
MAINTAINER ChangFa Hu <hcf1095246249@qq.com>

COPY package.json /tmp/package.json
COPY package-lock.json /tmp/package-lock.json
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
COPY . /tmp
RUN cd /tmp && cnpm install --save eslint eslint-plugin-css-modules && cnpm install
RUN cd /tmp && npm run build

FROM nginx
COPY --from=build /tmp/dist /usr/share/nginx/html
CMD ["nginx", "-g", "'daemon off;'"]