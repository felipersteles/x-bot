# Use a lean Node.js base image
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files for faster builds
COPY . .

# Install dependencies and build
RUN yarn
RUN yarn build

# Stage for production
FROM node:18-alpine as PROD

WORKDIR /app

# Set the time zone
ENV TZ=America/Sao_Paulo

# Copy only required files
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

EXPOSE 3333

ENTRYPOINT [ "node" ]
CMD ["dist/server/app.js"]

