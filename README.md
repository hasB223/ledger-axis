# LedgerAxis

LedgerAxis is a multi-tenant internal SaaS application for searching, reviewing, and managing company records and directors with tenant-scoped analytics.

## What Users Can Do Today

- Sign in with tenant-scoped access using JWT authentication
- Search companies by name or registration number
- Browse paginated company records within the current tenant
- Open a company profile to view registration, industry, revenue, employee count, and directors
- View analytics for industry distribution and top companies by revenue
- Switch between light and dark theme
- Switch between English and Bahasa Melayu in the frontend
- Explore the backend API through Swagger/OpenAPI docs

## Current User-Facing Data

The platform currently exposes these data points to users:

- Company name
- Registration number
- Industry
- Revenue
- Employee count
- Director full name
- Director nationality
- Director birth year
- Tenant-scoped industry summaries
- Tenant-scoped top company rankings by revenue
- Director counts per company in analytics-backed queries

## Current Visualizations

The current dashboard includes:

- Industry distribution bar chart
- Revenue mix donut chart for top companies
- KPI summary cards for industries covered, top company revenue, and top company director count
- Analytics tables for industry summary and top companies by revenue

These sections are useful as a baseline for product review, especially if you want reviewers to propose more advanced business-facing analytics later.

## Product Planning

The prioritized product roadmap is in [PRODUCT_ROADMAP.md](PRODUCT_ROADMAP.md).

## Stack

- Backend: Node.js, Express, MySQL, JWT, bcrypt, Joi
- Frontend: Vue 3, Vue Router, Pinia, Axios, Vue I18n, ApexCharts, Vite
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
    i18n/
    pages/
    router/
    stores/
```

## Backend Setup

1. Copy `backend/.env.example` to `backend/.env`.
2. Ensure MySQL is running and the configured DB user has permission to create databases and tables.
3. Install dependencies:

```bash
cd backend
npm install
```

4. Seed the database:

```bash
npm run seed
```

The seed script now bootstraps the database and schema automatically from `backend/src/db/schema.sql`, so you do not need to run the schema manually in a normal local setup.

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

## Frontend Setup

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

## SQL Coverage

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

