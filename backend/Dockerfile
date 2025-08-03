FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ensure wrapper script is executable (and convert CRLF  LF just in case)
RUN chmod +x node_modules/.bin/nodemon \
 && apt-get update && apt-get install -y --no-install-recommends dos2unix \
 && dos2unix node_modules/.bin/nodemon \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

EXPOSE 5000
CMD ["npx", "nodemon", "--legacy-watch", "index.js"]


# FROM node:20
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 5000
# CMD ["npx", "nodemon", "--legacy-watch", "index.js"]
# FROM node:20
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 5000
# CMD ["npx", "nodemon", "index.js"]

# FROM node:20

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# # Default CMD overridden by docker-compose
# CMD ["npx", "nodemon", "index.js"]