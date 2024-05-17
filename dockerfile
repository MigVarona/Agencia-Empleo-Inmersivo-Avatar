# Usa una imagen base de Nginx
FROM nginx:alpine

# Copia tu configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia todo el contenido de la carpeta "src/dist" a la carpeta de Nginx
COPY src/dist /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# No es necesario especificar el comando CMD ya que la imagen de Nginx lo tiene por defecto
