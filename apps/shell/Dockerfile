# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built application
COPY --from=builder /app/dist/ahoy-shell /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create health check endpoint
RUN echo '{"status":"healthy"}' > /usr/share/nginx/html/health

# Expose port
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 