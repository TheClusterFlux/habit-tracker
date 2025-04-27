# Build stage
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy app source
COPY . .

# Production stage
FROM node:18-alpine

# Set non-root user for better security
RUN addgroup -g 1001 -S appuser && \
    adduser -u 1001 -S appuser -G appuser

# Create app directory and set ownership
WORKDIR /app
COPY --from=builder /app .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Change ownership to non-root user
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080 || exit 1

# Start the application
CMD ["node", "server.js"]