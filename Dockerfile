FROM node:18-alpine
WORKDIR /app

# No more subfolder reference needed
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

EXPOSE 4000
CMD ["npm", "start"]

LABEL maintainer="chiemelaumeh1@gmail.com"
LABEL application="CICD server application"