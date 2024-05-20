# Etapa de producción con Nginx
FROM nginx:alpine

# Copia los archivos estáticos del frontend construidos en la etapa anterior
COPY frontend/dist /usr/share/nginx/html

# Copia el código del backend
COPY backend /app/backend

# Copia la configuración personalizada de Nginx
COPY frontend/nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80 para que pueda ser accesible desde el exterior
EXPOSE 80

# Comando para iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
