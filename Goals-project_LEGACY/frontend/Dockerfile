FROM node:16-alpine as builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/build  /usr/share/nginx/html

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]