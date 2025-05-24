# Use an official Nginx image as a base image
FROM nginx:alpine

# Copy static files to the default Nginx public directory
COPY frontend/ /usr/share/nginx/html/

# Copy custom Nginx configuration file  
COPY config/nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]