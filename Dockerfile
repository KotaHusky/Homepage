# Use the official Node.js image as the base image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use the official Node.js image as the base image for the runtime
FROM node:20-alpine AS runtime

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app ./

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npx", "serve@latest", "out", "-l", "3000"]