# SSR Controller-Service-Model Monolith

An SSR frontend served by an Express controller-service-model monolith.

## Features

- Vite + SWC for fast builds
- SSR + Hydration
- React + React Router
- Express backend starter
- Production builds with optimized assets
- Development mode with HMR using Vite Dev Server

## Installation

```bash
# clone repo
git clone
# install dependencies - prepare script will run and install .husky/_ for pre-commit hooks
npm i
```

## Backend Architecture

- View layer: SSR React frontend. Gets data from backend via api calls to REST API endpoints defined in `<domain>.routes.ts`
- Controller layer: Contains all Request/Response logic.
- Service layer: Contains all business logic and external services.
- Model layer: Contains direct DB queries.

## Frontend Architecture
