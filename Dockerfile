# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build stage
RUN npm run build

# Make port available to the world outside this container
EXPOSE 8000

# Start command
CMD ["node", "dist/index.js"]