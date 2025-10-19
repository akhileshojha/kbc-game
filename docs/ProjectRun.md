KBC Game - Full Stack Monorepo

Welcome to the KBC Style Quiz Game project! This repository contains the complete full-stack application, built using a modern microservice architecture and orchestrated with Docker.

🚀 Local Development (with Hot-Reloading)

This is the recommended workflow for daily development. It runs the infrastructure (databases, Kafka) in Docker, but mounts your local source code into the containers, enabling fast hot-reloading for both frontend and backend services.

1. Prerequisites

Docker & Docker Compose

Node.js & pnpm (npm install -g pnpm)

2. First-Time Setup

Important: Follow these steps exactly to ensure your environment is clean and your pnpm-lock.yaml is correctly generated.

Create the environment file.

cp .env.example .env


(Crucial) Install all monorepo dependencies and generate the lockfile.

pnpm install


Build the initial Docker images.

# This build is needed once to install node_modules inside the containers.
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d


Run database migrations.

docker-compose run --rm service-auth pnpm prisma migrate dev


3. Starting the Development Server

After the first-time setup, you will use this command to start your development environment:

# Start all services using the development overrides.
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
