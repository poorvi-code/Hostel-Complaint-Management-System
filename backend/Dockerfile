# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the backend port (adjust if your server.js uses a different one)
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
