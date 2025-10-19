# KBC Game - Full Stack Monorepo

Welcome to the KBC Style Quiz Game project\! This repository contains the complete full-stack application, built using a modern microservice architecture and orchestrated with Docker.

## 🏛️ Architecture Overview

This project is structured as a `pnpm` monorepo managed by Turborepo. It utilizes a microservice architecture to ensure scalability and separation of concerns.

  - **Frontend Apps**: Two separate React (Vite) applications for the player (`web`) and the admin (`admin-ui`).
  - **Backend Services**: Multiple Nest.js microservices, each with a distinct responsibility (authentication, game logic, etc.).
  - **Event Bus**: Apache Kafka is used for asynchronous, event-driven communication.
  - **Databases**: A polyglot persistence approach using MySQL, Redis, and MongoDB.
  - **Containerization**: The entire stack is containerized with Docker for a consistent development environment.

-----

## 🚀 Getting Started

Follow these steps to get the entire application running on your local machine.

### 1\. Prerequisites

  - **Docker & Docker Compose**: Ensure they are installed and running on your system.
  - **Node.js & pnpm**: Required for installing dependencies. Install `pnpm` globally via `npm install -g pnpm`.

### 2\. Environment Setup

The project uses a `.env` file at the root to configure all services.

```bash
# Create the environment file from the example (only needs to be done once)
cp .env.example .env
```

*You can review the `.env` file to see the default credentials and ports.*

### 3\. Full Reset & Build (First Run or After Errors)

**Important**: Follow these steps exactly to ensure your local environment is clean and your `pnpm-lock.yaml` file is correctly generated before running Docker.

From the **root of the project**, run the following commands in order:

1.  **(Optional) Clean up old Docker containers and volumes to start fresh.**

    ```bash
    docker-compose down -v
    ```

2.  **(Crucial) Remove old `node_modules` and the outdated lockfile.** This forces a clean install.

    ```bash
    rm -rf node_modules pnpm-lock.yaml
    ```

3.  **(Crucial) Regenerate the lockfile and install all dependencies.**

    ```bash
    pnpm install
    ```

4.  **Build and start all services with Docker.** This will now use the correct, up-to-date lockfile.

    ```bash
    docker-compose up --build -d
    ```

### Accessing the Running Services

| Service | Purpose | URL / Access Point |
| :--- | :--- | :--- |
| **Player App** | The main game interface for players. | `http://localhost:5173` |
| **Admin Dashboard**| For admins to manage quizzes (CRUD). | `http://localhost:5174` |
| **API Gateway** | The public entry point for all APIs. | `http://localhost:3000` |
| **MySQL DB** | Primary relational database. | `localhost:3306` |
| **Redis** | In-memory store for game sessions. | `localhost:6379` |
| **MongoDB** | Database for analytics. | `localhost:27017` |

### Common Docker Commands

| Command | Description |
| :--- | :--- |
| `docker-compose up -d` | Start all services in the background. |
| `docker-compose down` | Stop all running services. |
| `docker-compose down -v` | **(Full Reset)** Stop all services and **delete all data** in volumes. |
| `docker-compose logs -f <service>`| Follow the logs for a specific service (e.g., `api-gateway`). |
| `docker-compose exec <service> sh` | Open a shell inside a running container for debugging. |