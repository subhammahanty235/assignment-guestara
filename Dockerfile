# Use Node.js official image
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Expose port (use your app's port)
EXPOSE 5000

# Start the app
CMD ["npm", "run", "start"]
