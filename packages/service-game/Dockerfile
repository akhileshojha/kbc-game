# This unified Dockerfile can be used for all frontend and backend services.

# --- Stage 1: Builder ---
# This stage builds the entire monorepo.
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install pnpm globally in the container.
RUN npm install -g pnpm

# Copy the entire project context into the builder.
# The .dockerignore file at the root will prevent node_modules from being copied.
COPY . .

# Install ALL monorepo dependencies using pnpm.
RUN pnpm install --frozen-lockfile

# Build the ENTIRE monorepo. This is a more robust approach
# that ensures all dependencies are correctly linked before the next stage.
RUN pnpm turbo build

# --- Stage 2: Production Runner ---
# This stage creates the final, lean image for the specific service.
FROM node:20-alpine AS runner

# This ARG is passed from docker-compose.yml and is crucial.
ARG APP_NAME

WORKDIR /usr/src/app

# Copy the built application files for the specific service from the builder stage.
COPY --from=builder /usr/src/app/packages/${APP_NAME}/dist ./dist

# Copy only the production package.json for the specific service.
COPY --from=builder /usr/src/app/packages/${APP_NAME}/package.json ./package.json

# Install ONLY the production dependencies for the specific service.
RUN npm install -g pnpm && pnpm install --prod

# Set the command to run the application.
CMD ["node", "dist/main"]

