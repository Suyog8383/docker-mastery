# Step 1: Base image
FROM node:22-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy application source
COPY . .

# Step 6: Expose application port
EXPOSE 3000

# Step 7: Start application
CMD ["node", "src/server.js"]