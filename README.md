# Edpulse — Product Catalog

Technical assessment: a full-stack product consultation system with a NestJS REST API and a React frontend.

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Backend  | NestJS, TypeScript                  |
| Frontend | React, TypeScript, Vite             |
| Cache    | In-memory (Map-based)               |
| Deploy   | Render (PaaS)                       |

## Project Structure

```
edpulse/
├── backend/          # NestJS API
│   └── src/
│       ├── products/       # Products module (controller, service, cache, DTOs)
│       ├── domain/         # Entities and enums
│       └── common/         # Exception filters
├── frontend/         # React SPA
│   └── src/
│       ├── components/     # ProductCard, ProductFilters, Pagination, ProductList
│       ├── hooks/          # useProducts
│       └── types/          # TypeScript interfaces
├── AI_USAGE.md       # AI usage documentation (required)
└── render.yaml       # PaaS deployment blueprint
```

## API

### `GET /products`

Returns a paginated, optionally filtered list of products.

| Parameter      | Type   | Default | Description                              |
|----------------|--------|---------|------------------------------------------|
| `page`         | number | 1       | Page number (min: 1)                     |
| `limit`        | number | 10      | Items per page (min: 1, max: 100)        |
| `category`     | string | —       | Filter by category (e.g. `Electronics`) |
| `stock_status` | enum   | —       | `in_stock`, `low_stock`, `out_of_stock`  |

**Example:**

```bash
curl "http://localhost:3000/products?page=1&limit=5&category=Food&stock_status=in_stock"
```

**Response:**

```json
{
  "data": [
    {
      "id": 11,
      "name": "Organic Honey",
      "category": "Food",
      "price": 12.99,
      "stock_status": "in_stock"
    }
  ],
  "meta": {
    "total": 4,
    "page": 1,
    "limit": 5,
    "totalPages": 1
  }
}
```

## Local Development

### Prerequisites

- Node.js 20+
- npm

### Backend

```bash
cd backend
npm install
npm run start:dev
```

API runs at `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173` (proxies API calls to `http://localhost:3000` by default).

### Environment Variables

**Backend** (`backend/.env`):

```
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

**Frontend** (`frontend/.env`):

```
VITE_API_URL=http://localhost:3000
```

## Tests

```bash
# Backend unit tests
cd backend && npm test

# Backend e2e tests
cd backend && npm run test:e2e
```

## Deployment (Render)

A `render.yaml` blueprint is included for one-click deployment:

1. Push this repository to GitHub.
2. Create a new **Blueprint** on [Render](https://render.com) and connect the repo.
3. Render will provision:
   - **edpulse-api** — NestJS backend (Web Service)
   - **edpulse-frontend** — React static site

After deployment, set `VITE_API_URL` on the frontend service to the backend URL (e.g. `https://edpulse-api.onrender.com`).

### Manual deployment

**Backend (Web Service):**
- Build command: `cd backend && npm install && npm run build`
- Start command: `cd backend && npm run start:prod`
- Environment: `PORT=3000`, `CORS_ORIGIN=https://your-frontend-url.onrender.com`

**Frontend (Static Site):**
- Build command: `cd frontend && npm install && npm run build`
- Publish directory: `frontend/dist`
- Environment: `VITE_API_URL=https://your-backend-url.onrender.com`

## Features Checklist

- [x] `GET /products` with pagination (`page`, `limit`)
- [x] Filter by category OR stock status
- [x] Pagination works with active filters
- [x] In-memory product storage (TypeScript array)
- [x] In-memory query-result cache
- [x] DTO validation (`class-validator`)
- [x] Global exception filter
- [x] Modular SOLID architecture
- [x] React product list with pagination controls
- [x] Category and stock status filter dropdowns
- [x] Responsive design (mobile + desktop)
- [x] TypeScript throughout
- [x] `AI_USAGE.md` documentation
- [x] PaaS deployment configuration
