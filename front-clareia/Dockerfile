# Build stage
FROM oven/bun:alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN bun run build

# Runtime stage
FROM oven/bun:alpine AS runner

# Set working directory
WORKDIR /app

# Copy only the necessary build artifacts from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Expose the port Next.js will run on
EXPOSE 3000

# Set environment variable for production
ENV NODE_ENV=production

# Run the Next.js app with Bun
CMD ["bun", "run", "start"]
