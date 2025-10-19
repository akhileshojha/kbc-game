# This Dockerfile should be used for all Nest.js services.
# (api-gateway, service-auth, service-game, service-quiz, service-analytics)

# --- Stage 1: Builder ---
# This stage installs dependencies and builds the entire monorepo.
FROM node:20-alpine AS builder

# This ARG is passed from docker-compose.yml and is crucial.
ARG APP_NAME

WORKDIR /usr/src/app

# Install pnpm globally in the container.
RUN npm install -g pnpm

# Copy the entire project context into the builder.
# The .dockerignore file at the root will prevent node_modules and other unnecessary files from being copied.
COPY . .

# Install ALL monorepo dependencies using pnpm.
RUN pnpm install --frozen-lockfile

# Build the ENTIRE monorepo. This ensures all dependencies are correctly linked.
RUN pnpm turbo build

# --- Stage 2: Production Pruner ---
# This new intermediate stage uses `pnpm deploy` to create a clean, production-only build of our target service.
FROM builder AS pruner

# This ARG must be re-declared.
ARG APP_NAME

WORKDIR /usr/src/app

# This is the key command. It creates a self-contained production build in the /prod folder,
# including only the necessary production node_modules, without any devDependencies.
RUN pnpm deploy --prod --filter=@kbc/${APP_NAME} /prod

# --- Stage 3: Production Runner ---
# This stage creates the final, lean image that will be deployed.
FROM node:20-alpine AS runner

# This ARG must be re-declared.
ARG APP_NAME

WORKDIR /usr/src/app

# Copy the clean, production-ready build from the 'pruner' stage.
# This single COPY command brings over the compiled code and the correct production node_modules.
COPY --from=pruner /prod .

# Set the command to run the application.
CMD ["node", "dist/main.js"]

