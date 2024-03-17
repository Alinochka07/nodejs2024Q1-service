FROM node:20-lts

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

RUN npm run build

CMD [ "npm", "start" ]

# Use the official PostgreSQL image from Docker Hub
FROM postgres:latest

# Set environment variables (optional, you can use .env file)
ENV POSTGRES_DB=my_database
ENV POSTGRES_USER=my_user
ENV POSTGRES_PASSWORD=my_password

# Copy initialization scripts (if any)
# COPY init.sql /docker-entrypoint-initdb.d/

# Expose PostgreSQL port
EXPOSE 5432