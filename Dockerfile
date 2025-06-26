# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Default port
EXPOSE 3000
RUN node mongoseed.js

# Optional: run seed manually inside container by:
# docker exec -it qr_web node mongoseed.js

CMD ["node", "app.js"]
