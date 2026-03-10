# LedgerAxis

Multi-tenant internal SaaS application for managing companies, directors, and tenant-scoped analytics.

## Stack

- Backend: Node.js, Express, MySQL, JWT, bcrypt, Joi
- Frontend: Vue 3, Vue Router, Pinia, Axios, Vite
- Architecture: `routes -> controllers -> services -> repositories`

## Structure

```text
backend/
  src/
    config/
    controllers/
    db/
    docs/
    middleware/
    repositories/
    routes/
    services/
    utils/
    validators/
  scripts/
frontend/
  src/
    api/
    components/
    pages/
    router/
    stores/
```

## Backend setup

1. Copy `backend/.env.example` to `backend/.env`.
2. Create the database schema by running the SQL in `backend/src/db/schema.sql`.
3. Install dependencies:

```bash
cd backend
npm install
```

4. Seed the database:

```bash
npm run seed
```

5. Start the API:

```bash
npm run dev
```

API base URL: `http://localhost:4000/api`

Swagger docs: `http://localhost:4000/api/docs`

Raw OpenAPI spec: `http://localhost:4000/api/docs.json`

The docs are controlled by `API_DOCS_ENABLED` and default to enabled outside production.

Sample seeded login:

- Email: `seed.admin1@example.com`
- Password: `Password123!`

## Frontend setup

1. Copy `frontend/.env.example` to `frontend/.env`.
2. Install dependencies:

```bash
cd frontend
npm install
```

3. Start the frontend:

```bash
npm run dev
```

Frontend URL: `http://localhost:5173`

## Implemented APIs

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/companies`
- `GET /api/companies/:id`
- `GET /api/companies/search?q=`
- `POST /api/companies`
- `PUT /api/companies/:id`
- `DELETE /api/companies/:id`
- `GET /api/companies/:id/directors`
- `GET /api/analytics/industry-summary`
- `GET /api/analytics/top-companies`
- `GET /api/analytics/advanced-queries`

All company and analytics endpoints require JWT auth and apply tenant filtering.

OpenAPI documentation is served at `/api/docs` and the raw spec at `/api/docs.json`.

## SQL coverage

Repository-layer queries include:

- inner join for company directors
- left join for companies without directors
- aggregation by industry
- multi-table join across tenants, companies, and directors
- search with `LIKE` and pagination
- top revenue ordering
- director counts per company
- `HAVING` clause examples

Reference SQL examples are in `backend/src/db/complex-queries.sql`.
