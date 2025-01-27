# Use the official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependencies configuration
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the Next.js server in production mode
CMD ["npm", "run", "start"]