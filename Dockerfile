# build environment
FROM node:alpine as build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/nginx/cert /etc/nginx/cert
COPY --from=build /app/nginx/pki-validation /etc/nginx/pki-validation
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]