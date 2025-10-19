# KBC Game - Monorepo

This monorepo contains the full stack for the KBC Style Quiz Game, including frontend applications, backend microservices, and infrastructure configurations.

First-Time Setup & Docker Workflow

1. Prerequisites

Docker & Docker Compose

Node.js & pnpm (npm install -g pnpm)

2. Create Environment File

Before the first run, create a .env file in the root of the project and paste the required environment variables into it.

3. Full Reset & Build (Recommended for First Run or Errors)

Important: Follow these steps exactly to ensure your local environment is clean and your pnpm-lock.yaml file is correctly generated before running Docker.

From the root of the project, run the following commands in order:

# Step 1: (Optional but Recommended) Clean up any old Docker containers and volumes to start fresh.
docker-compose down -v

# Step 2: (Crucial) Remove old node_modules and the outdated lockfile. This forces a clean install.
rm -rf node_modules pnpm-lock.yaml

# Step 3: (Crucial) Regenerate the lockfile and install all dependencies based on your latest package.json files.
pnpm install

# Step 4: Build and start all services with Docker. This will now use the correct, up-to-date lockfile.
docker-compose up --build -d


4. Accessing the Applications

Player Game App: http://localhost:5173

Admin Dashboard: http://localhost:5174

API Gateway: http://localhost:3000

Troubleshooting

Lockfile Errors (ERR_PNPM_OUTDATED_LOCKFILE)

If you encounter this error, it means your pnpm-lock.yaml is out of sync. You must run the full reset workflow from Step 3 above to fix it. Simply running pnpm install again may not be enough.

Viewing Logs

To see the logs for a specific service (e.g., api-gateway), run:

docker-compose logs -f api-gateway


Stopping the Application

To stop all running containers, run:

docker-compose down



/kbc-game-turborepo
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # CI/CD pipeline (e.g., build, test, push images, deploy to K8s)
├── .vscode/
│   └── launch.json            # VSCode debug configurations
├── infra/
│   ├── docker-compose.yml     # For LOCAL development (spins up all dbs, kafka, etc.)
│   └── k8s/                   # Kubernetes manifests for production deployment
│       ├── 0-namespaces.yaml
│       ├── 1-persistent-volumes.yaml
│       ├── 2-configmaps-secrets.yaml
│       ├── 3-mysql.yaml
│       ├── 4-redis.yaml
│       ├── 5-mongodb.yaml
│       ├── 6-kafka-zookeeper.yaml
│       └── services/          # Deployments, Services, and Ingress for each microservice
│           ├── api-gateway.yaml
│           ├── service-auth.yaml
│           ├── service-game.yaml
│           ├── service-quiz.yaml
│           └── service-analytics.yaml
├── packages/
│   ├── admin-ui/              # Admin Dashboard React App
│   │   ├── public/
│   │   ├── src/               # (Components, Pages, Hooks, Services using Shadcn, TanStack Table)
│   │   ├── Dockerfile         # Multi-stage build for a lean Nginx production image
│   │   ├── nginx.conf         # Nginx config for the admin app container
│   │   └── package.json
│   │
│   ├── api-gateway/           # Nest.js API Gateway (Public-facing entry point)
│   │   ├── src/               # (Handles HTTP/WebSockets, forwards to services via Kafka/gRPC)
│   │   ├── Dockerfile         # Multi-stage build for the Node.js service
│   │   └── package.json
│   │
│   ├── service-analytics/     # Nest.js Microservice for Analytics
│   │   ├── src/               # (Subscribes to Kafka topics, writes to MongoDB)
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── service-auth/          # Nest.js Microservice for Authentication
│   │   ├── src/               # (Handles user creation, login, JWTs, RBAC logic)
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── service-game/          # Nest.js Microservice for Core Game Logic
│   │   ├── src/               # (Manages active game state in Redis, writes history to MySQL)
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── service-quiz/          # Nest.js Microservice for Quiz/Question CRUD
│   │   ├── src/               # (Handles all admin-related quiz management)
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── shared/                # Shared library for types, DTOs, configs
│   │   ├── src/
│   │   └── package.json       # (No Dockerfile, this is a build-time dependency)
│   │
│   └── web/                   # Player-Facing React App
│       ├── public/
│       ├── src/               # (Components, Pages, Redux Store, TanStack Query, Storybook)
│       ├── Dockerfile         # Multi-stage build for a lean Nginx production image
│       ├── nginx.conf         # Nginx config for the player app container
│       └── package.json
│
├── .dockerignore
├── .gitignore
├── package.json               # Root package.json (defines Turborepo workspaces)
└── turbo.json                 # Turborepo pipeline configuration