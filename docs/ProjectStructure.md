/kbc-game
├── .env                     # Root environment variables for Docker Compose
├── .gitignore               # Files and folders to be ignored by Git
├── docker-compose.yml       # Orchestrates all Docker containers for local development
├── Dockerfile               # Unified Dockerfile for building all apps and services
├── package.json             # Root package.json defining workspaces and global scripts
├── pnpm-workspace.yaml      # Defines the location of all packages for pnpm
├── README.md                # Project overview and instructions
├── tsconfig.base.json       # Base TypeScript configuration for the monorepo
├── turbo.json               # Turborepo pipeline configuration
├── infra/
│   └── k8s/                 # Kubernetes manifests for production deployment
└── packages/
    ├── admin-ui/            # Admin Dashboard React App
    │   ├── src/
    │   ├── index.html
    │   ├── nginx.conf
    │   ├── package.jsonww
    │   ├── tsconfig.json
    │   ├── tsconfig.node.json
    │   └── vite.config.ts
    ├── api-gateway/         # Nest.js API Gateway (Public-facing entry point)
    │   ├── src/
    │   ├── package.json
    │   └── tsconfig.json
    ├── service-analytics/   # Nest.js Microservice for Analytics
    │   ├── src/
    │   ├── package.json
    │   └── tsconfig.json
    ├── service-auth/        # Nest.js Microservice for Authentication
    │   ├── src/
    │   ├── package.json
    │   └── tsconfig.json
    ├── service-game/        # Nest.js Microservice for Core Game Logic
    │   ├── src/
    │   ├── package.json
    │   └── tsconfig.json
    ├── service-quiz/        # Nest.js Microservice for Quiz/Question CRUD
    │   ├── src/
    │   ├── package.json
    │   └── tsconfig.json
    ├── shared/              # Shared library for types, DTOs, etc.
    │   ├── src/
    │   ├── package.json
    │   └── tsconfig.json
    └── web/                 # Player-Facing React App
        ├── src/
        ├── index.html
        ├── nginx.conf
        ├── package.json
        ├── tsconfig.json
        ├── tsconfig.node.json
        └── vite.config.ts