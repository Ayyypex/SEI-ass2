# Use the official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Bundle your app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the Node.js application
CMD ["node", "app.js"]
