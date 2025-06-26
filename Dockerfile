# Base image
FROM node:18

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
