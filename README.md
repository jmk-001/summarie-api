# Summarie API

Robust, type-safe GraphQL API for creating documents and generating AI summaries asynchronously. Built with NestJS, Prisma, PostgreSQL, and pg-boss, featuring JWT authentication and GraphQL subscriptions for real-time result delivery.

## Features

- GraphQL API (Apollo) with code-first schema and Playground
- JWT authentication (REST endpoints for sign-up/sign-in)
- Document, Prompt Preset, Summary Job, and Summary Result modules
- Asynchronous processing via pg-boss backed by PostgreSQL
- GraphQL subscription to receive summary results in real time
- Prisma ORM with migrations and PostgreSQL
- Developer-friendly TypeScript project structure

## Tech Stack

- Node.js, TypeScript, NestJS
- GraphQL (Apollo), `graphql-ws` for subscriptions
- Prisma ORM, PostgreSQL
- pg-boss job queue
- Docker Compose (local databases)

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- Docker Desktop (for local PostgreSQL)

### Environment

Create `.env` and `.env.test` files in the project root. These files are used both by Docker Compose and the app/scripts.

Example `.env` (development):

```
# Postgres container config (dev)
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres

# Application
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres?schema=public
JWT_SECRET=replace_with_strong_secret
PORT=3000
```

Example `.env.test` (e2e/tests):

```
# Postgres container config (test)
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres

# Application (note the port 5433 for test DB)
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/postgres?schema=public
JWT_SECRET=replace_with_strong_secret_for_tests
```

### Install

```
npm install
```

### Start databases

```
# Start dev DB and apply migrations
npm run db:dev:restart

# Alternatively (separate steps)
npm run db:dev:up
npm run prisma:dev:deploy
```

### Run the app

```
# Development (watch)
npm run start:dev

# Production build
npm run build
npm run start:prod
```

The GraphQL Playground is available at http://localhost:3000/graphql by default (configurable via `PORT`).

## Authentication

Use the REST endpoints to obtain a JWT, then pass it to GraphQL requests.

```
# Sign up
curl -X POST http://localhost:3000/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"StrongPassword!"}'

# Sign in
curl -X POST http://localhost:3000/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"StrongPassword!"}'
```

Responses include `{ "accessToken": "..." }`. In GraphQL requests, set the header:

```
Authorization: Bearer <accessToken>
```

For subscriptions, pass the same token via `connectionParams` as `authorization`.

## Typical Workflow (GraphQL)

1) Create a document:

```graphql
mutation CreateDocument($data: CreateDocumentInput!) {
  createDocument(data: $data) { id title createdAt }
}

# Variables
{
  "data": {
    "title": "Sample",
    "content": "Text to summarize",
    "sourceType": "manual"
  }
}
```

2) Create a summary job referencing the document:

```graphql
mutation CreateSummaryJob($data: CreateSummaryJobInput!) {
  createSummaryJob(data: $data) {
    id
    status
    createdAt
  }
}

# Variables
{
  "data": {
    "documentId": "<documentId>",
    "model": "gpt-mock",
    "schemaVersion": 1,
    "paramsSnapshot": { "tone": "concise" }
  }
}
```

3) Subscribe to the result (this also enqueues processing):

```graphql
subscription OnProcessSummary($jobId: String!) {
  processSummary(jobId: $jobId) {
    id
    jobId
    content
    tokensUsed
    model
  }
}
```

The server publishes the `SummaryResult` when processing finishes. By default, the LLM step is mocked in `src/summary/services/summary-llm.service.ts` for local development.

## Scripts

```
# Databases
npm run db:dev:up         # start dev Postgres (Docker)
npm run db:dev:rm         # remove dev Postgres container/volumes
npm run db:dev:restart    # remove + start + migrate (dev)
npm run db:test:restart   # same for test DB

# Prisma
npm run prisma:dev:deploy
npm run prisma:test:deploy

# App
npm run start             # start
npm run start:dev         # start (watch)
npm run start:prod        # run compiled build
npm run build             # compile TS -> dist

# Lint/format/tests
npm run lint
npm run format
npm run test
npm run test:e2e
npm run test:cov
```

## Project Structure (selected)

```
src/
  auth/              # JWT auth (REST), guards, strategy
  document/          # GraphQL CRUD for documents
  prompt-preset/     # Manage prompt presets
  summary-job/       # Create/track summary jobs
  summary-result/    # Persist and query results
  summary/           # Queue, processor, subscription
  worker/            # pg-boss setup
  prisma/            # Prisma service
  common/            # Config, decorators, types
```

The GraphQL schema is generated to `src/schema.graphql`.

## Database & Migrations

- Prisma migrations live in `prisma/migrations`.
- Local development uses Dockerized PostgreSQL via `docker-compose.yml`.
- The app and worker connect using `DATABASE_URL` (must be set).

## Notes

- The summary engine is mocked for development; replace `SummaryLlmService` with a real LLM provider when ready.
- Subscriptions require the JWT to be provided via `connectionParams.authorization`.

## License

This project is currently provided as UNLICENSED.

