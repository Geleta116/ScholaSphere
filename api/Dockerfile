# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install TypeScript globally
RUN npm install -g typescript

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Install wait-for-it script
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

# Set up the rest of your Dockerfile
# ...

# Build the TypeScript code
RUN tsc

# Command to start the application with database wait
CMD ["sh", "-c", "/usr/wait-for-it.sh db:5432 -- npx prisma migrate deploy --preview-feature && npx prisma db seed && node dist/index.js"]

# Set the environment variable to use the compiled JavaScript
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000
