FROM node:16-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Expose ports (React app and WebSocket server)
EXPOSE 3000
EXPOSE 5000

# Start command (will be overridden in docker-compose)
CMD ["node", "vg-canvas.js"]