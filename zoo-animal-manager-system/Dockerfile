# Step 1: Build the React app
FROM node:23 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Set up Nginx to serve the app
FROM nginx:alpine

# Copy the built React app from the build stage to Nginx's default directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to access the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
