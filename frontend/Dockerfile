# Etapa 1: Build
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servidor Nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# Copiamos una configuración de nginx para manejar el ruteo de React
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]