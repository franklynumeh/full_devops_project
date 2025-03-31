FROM node:18-alpine
WORKDIR /app
COPY cicd_DevOps_Project_NodeJS_server/package*.json ./
RUN npm install
COPY cicd_DevOps_Project_NodeJS_server/ .
EXPOSE 4000
CMD ["npm", "start"]
LABEL maintainer="chiemelaumeh1@gmail.com"
LABEL application="CICD server application"