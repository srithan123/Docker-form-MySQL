# Use lightweight Nginx Alpine image
FROM nginx:alpine

# Remove default HTML files
RUN rm -rf /usr/share/nginx/html/*

# Copy frontend files into Nginx html folder
COPY . /usr/share/nginx/html

# Expose Nginx default port
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
