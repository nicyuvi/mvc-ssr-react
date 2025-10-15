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

---

# TODO: Make a Blog - SSR Controller-Service-Model Monolith

# SSR Controller-Service-Model Monolith Architecture

Backend:
Views -> Controller -> Service -> Model

- View layer: SSR React frontend. Gets data from backend via api calls to REST
  API endpoints defined in `<domain>.routes.ts`
- Controller layer: Contains all Request/Response logic.
- Service layer: Contains all business logic and external services.
- Model layer: Contains direct DB queries.

Frontend:
server-entry -> router -> render page (layout + components) -> http req and
populate page -> hydrate with client-entry

# create ssr architecture

- [x] scaffold vite-extra ssr-react-ts
- [x] include dynamic data into each render
- [x] make data available in window for hydration access in client-entry
- [x] move src to src/views with entry-server and entry-client
- [x] add src/services
- [x] tsconfig will be frontend by default. create tsconfig.node to include
      server code in src/services and src/utils
- [x] implement react router
  - [x] ssr router basic
  - [x] add context for server redirects i.e. 404 response
- [x] add tailwindcss

# create SSG functionality

- [] prerender script
  - [] extract ssr logic
  - [] output to static/ html files

# POST DOMAIN REST API

- [x] get /posts
- [x] get /posts/:slug

# implement frontend data fetching

- [] move data fetching to client (tanstack query) - hit server for ssr + data. hit server again
  when client routes to new page, just for the data. client is hydrated.

Bugs:

- [x] There is a flash of unstyled content on each page render. look into this.
  - fixed with tailwind css solution. entire tailwind lib funneled through styles.css
  - styles.css included in index.html.
  - during dev this reads from local files.
  - in prod vite minifies, strips unused css, and includes the prod css bundle in
    dist/index.html

Extra Features:

- [x] add ts to server.js
      tsx server.ts # For development
      tsc && node dist/server.js # For production (compile first)
- [x] setup tooling (prettier, eslint, husky)
- [] replace tsc with esbuild for prod builds and pre commit hooks
- [] REFACTOR - put render logic in a function utils/renderSSRPage(req, res, data)
- [] move types.ts to types/index.d.ts

my-app/
src/
domain/
user/
user.routes.ts
user.controller.ts
user.service.ts
user.model.ts
other/
other.routes.ts
other.controller.ts
other.service.ts
other.model.ts
views/ // come up with frontend architecture
components/
pages/
App.tsx
entry-client.tsx
entry-server.tsx
utils/
render.ts
server.ts // app entry. take note of where index.html is
index.html // client entry. point to src/views/entry-client
package.json // adjust scripts for src/
vite.config.ts // client build tool. point to src/index.html
tsconfig.node.json // for server
tsconfig.json // for client
eslint.config.js // eslint config
.prettierrc // prettier config
.prettierignore
.husky // pre-commit hook
.gitignore
