## Overview

This repository implements the **Paginated DataList** take-home assignment using:

- Next.js (App Router, TypeScript)
- TailwindCSS
- Vitest + React Testing Library (unit & integration)
- Playwright (E2E)
- Docker (multi-stage build) and GitHub Actions CI

The main feature is a `<DataList>` component that:

- Fetches a large user dataset from the DummyJSON custom endpoint
- Paginates it client-side with **20 users per page**
- Displays **Full Name, Job, Address** for each user
- Provides accessible Previous/Next pagination controls

## Getting Started (Local Development)

Install dependencies:

```bash
npm ci
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` to view the app. The main page is implemented in `app/page.tsx` and renders the `DataList` feature.

### Environment variables

By default, the app reads from the DummyJSON URL:

```bash
NEXT_PUBLIC_USERS_API_URL=https://dummyjson.com/c/81a3-7acb-406a-8571
```

You can override it by defining `NEXT_PUBLIC_USERS_API_URL` in a local `.env` file.

## Testing

### Unit & Integration Tests (Vitest)

Run all unit and integration tests:

```bash
npm test
```

Key coverage:

- `lib/pagination.ts` via `tests/unit/pagination.test.ts`
  - Page boundaries, invalid inputs, and total pages calculation
- `components/data-list/DataList.tsx` via `tests/integration/DataList.integration.test.tsx`
  - Mocks `fetch` for:
    - Successful API response (loading → success, 20 items per page, correct formatting of name/job/address, working pagination)
    - Failed API response (loading → error state)

### End-to-End Tests (Playwright)

Locally, Playwright can manage the dev server for you:

```bash
npm run test:e2e
```

The E2E test (`e2e/dataList.spec.ts`):

- Visits `/`
- Waits for `data-testid="user-card"` elements
- Asserts **20** user cards are visible
- Captures the first user name, clicks **Next page**, and asserts:
  - There are still 20 cards
  - The first user name has changed (indicating page 2 data)

## Docker

This project includes a multi-stage Dockerfile that produces a small production image using Next.js **standalone** output.

Build the image:

```bash
docker build -t proxet-app .
```

Run the container:

```bash
docker run --rm -p 3000:3000 proxet-app
```

Then open `http://localhost:3000` in your browser.

## Continuous Integration (GitHub Actions)

The workflow in `.github/workflows/ci.yml` runs on pushes and pull requests and has two jobs:

- **unit_integration_tests**
  - Installs dependencies with `npm ci`
  - Runs `npm run lint`
  - Runs `npm test` (Vitest unit + integration)

- **e2e_docker_tests**
  - Builds the Docker image (`proxet-app`)
  - Creates a Docker network and runs the app container
  - Waits for the app to be healthy
  - Runs Playwright tests in the official Playwright Docker image against the running app
  - Cleans up containers and network

This provides an automated, containerized pipeline that validates:

- API interaction and pagination logic
- Successful data flow from the API through the UI
- E2E behavior of the paginated DataList feature
