# AI Usage Documentation

This document describes how Claude (via Cursor) was used strategically during the development of the Edpulse technical assessment.

## Tasks delegated to Claude

### 1. Project scaffolding and architecture
**Problem:** Bootstrap a full-stack solution (NestJS + React) that meets SOLID principles, with clear module boundaries, in a short timeframe.

**What I asked:** Set up the monorepo structure, define backend modules (controller, service, cache service, DTOs, exception filter) and frontend components (filters, pagination, product list) following the PDF requirements.

**Adopted directly:**
- Separation of concerns: `ProductsCacheService` handles caching, `ProductsService` handles business logic, `ProductsController` handles HTTP.
- DTO validation with `class-validator` and global `ValidationPipe`.
- Custom `HttpExceptionFilter` for consistent error responses.
- Frontend hook pattern (`useProducts`) to isolate data-fetching logic from UI components.

### 2. In-memory caching strategy
**Problem:** Implement a cache keyed on query parameters (page, limit, category, stock_status) without over-engineering.

**What I asked:** Design a simple in-memory cache that stores paginated/filtered results and avoids redundant computation.

**Adopted directly:**
- `Map<string, PaginatedProductsResponse>` with a `buildKey()` method that sorts keys for consistent cache hits.
- Cache check at the start of `findAll()` before filtering/pagination.

**Adapted:**
- Kept the cache as a dedicated injectable service rather than inline in `ProductsService`, to respect the Single Responsibility Principle even though a simple `Map` in the service would have worked.

### 3. Responsive UI design
**Problem:** Build a clean, responsive product catalog UI without a design system or component library.

**What I asked:** Create a mobile-friendly layout with filter dropdowns, product cards, and pagination controls.

**Adopted directly:**
- CSS Grid for the product list with `auto-fill` and `minmax(280px, 1fr)`.
- Mobile breakpoint that hides page number buttons and stacks filters vertically.
- Stock status badges with color-coded styling.

**Adapted:**
- Used plain CSS instead of Tailwind or a UI library to keep dependencies minimal and demonstrate CSS skills.

### 4. Deployment configuration
**Problem:** Prepare the project for PaaS deployment on Render.

**What I asked:** Generate `render.yaml` and environment variable documentation.

**Adopted directly:**
- `render.yaml` with separate web services for backend and frontend static site.
- `VITE_API_URL` environment variable for frontend API connection.

## Suggestions rejected and why

### 1. Adding a `GET /products/categories` endpoint
**Suggestion:** Expose a separate endpoint to fetch available categories dynamically.

**Rejected because:** The PDF explicitly states "Un seul endpoint GET" (only one GET endpoint). Categories are hardcoded in the frontend based on the known product data (`Electronics`, `Clothing`, `Food`).

### 2. Using Zustand for state management
**Suggestion:** Use Zustand for global state management.

**Rejected because:** The application state is local to a single page (page number, filters). `useState` in `App.tsx` is sufficient and avoids an extra dependency. The PDF lists Zustand as an option, not a requirement.

### 3. Using `cache-manager` npm package
**Suggestion:** Use NestJS's built-in `cache-manager` module with `@nestjs/cache-manager`.

**Rejected because:** The requirement is for a simple in-memory cache. A custom `Map`-based service is more transparent, has no TTL complexity to explain, and demonstrates understanding of caching fundamentals without relying on a framework abstraction.

### 4. Adding CRUD endpoints
**Suggestion:** Add POST/PUT/DELETE for a more complete API.

**Rejected because:** The PDF explicitly forbids creation, update, and deletion. Only `GET /products` is allowed.

## Decision-making logic

When evaluating Claude's suggestions, I prioritized:
1. **Strict compliance** with the PDF requirements (single endpoint, no database, in-memory storage).
2. **SOLID principles** without over-abstraction (dedicated services where responsibilities differ, not micro-modules for every function).
3. **Minimal dependencies** — only add packages when they provide clear value (e.g., `class-validator` for DTO validation).
4. **Demonstrable skills** — custom cache implementation and clean component architecture show understanding rather than relying solely on framework magic.
