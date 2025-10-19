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

## --- Stage 2: Runner ---
FROM node:20-alpine AS runner

ARG APP_NAME
WORKDIR /usr/src/app

RUN npm install -g pnpm

# Use pnpm deploy to extract only what's needed for this package
COPY --from=builder /usr/src/app ./
RUN pnpm deploy --prod --filter=@kbc/${APP_NAME} ./prod

WORKDIR /usr/src/app/prod
CMD ["node", "dist/main"]

