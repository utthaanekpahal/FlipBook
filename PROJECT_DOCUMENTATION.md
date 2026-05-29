# FlipBook — Project Documentation

This document summarizes the frontend and backend structure, how to run each part, and recommended next steps for development.

## Overview

- Frontend: Vite + React application in the project root (`src/`).
- Backend: Node + Express + Mongoose in `backend/`.

## Frontend — key files
- `package.json` — front-end dependencies and scripts (`dev`, `build`, `preview`).
- `src/main.jsx` — React entry; wraps `App` with `BrowserRouter` and `Contextfile`.
- `src/App.jsx` — Route definitions (routes: `/`, `/Loginform`, `/Dashboard`, `/Category`, `/FlipPage`, `/Books`, `/UploadBooks`, etc.).
- `src/Context/Contextfile.jsx` — global React context (`mycontext`) used across app.
- `src/pages/` — page components: `Books.jsx`, `Category.jsx`, `FlipPage.jsx`, `UploadBooks.jsx`, `ClassPage.jsx`, `Ticket.jsx`.
- `src/Component/` — UI components: `Loginform.jsx`, `Signform.jsx`, `Dashboard.jsx`, `Agentlogin.tsx`, `AgentDashboard.jsx`.

Notes
- `src/pages/Books.jsx` fetches books from `http://localhost:3000/api/books` and provides client-side filters.

## Backend — key files
- `backend/Server.js` — connects to MongoDB, configures middleware, mounts `/api/books` routes.
- `backend/config/db.js` — reads `MONGODB_URI` from env and connects via `mongoose`.
- `backend/routes/bookRoutes.js` — routes: `POST /upload`, `GET /` (mounted at `/api/books`).
- `backend/controllers/bookController.js` — handlers `uploadBook` and `getBooks`.
- `backend/models/Book.js` and `Category.js` — Mongoose schemas.

API Endpoints (development)
- GET http://localhost:3000/api/books/ — returns all books.
- POST http://localhost:3000/api/books/upload — create a book (JSON body with `title`, `author`, `category`, etc.).

## How to run (frontend)
1. Install deps and start dev server:

```bash
npm install
npm run dev
```

Frontend dev server is served by Vite (default port 5173). If you run the backend on port 3000, add a Vite proxy (optional) to avoid CORS.

## How to run (backend)
1. From `backend/` install deps and run:

```bash
cd backend
npm install
# start server (no start script currently):
node Server.js
# or with nodemon:
nodemon Server.js
```

Ensure `.env` has `MONGODB_URI` (and optionally `PORT`).

## Recommended next steps (prioritized)
1. Add `start`/`dev` scripts to `backend/package.json` (e.g., `"start": "node Server.js"`, `"dev": "nodemon Server.js"`).
2. Create `backend/.env.example` documenting required env vars (`MONGODB_URI`, `PORT`).
3. Add validation for `POST /api/books/upload` (use `joi` or express-validator).
4. Add API documentation (OpenAPI/Swagger) — generate a basic spec from routes.
5. Add Vite proxy in `vite.config.js` or `package.json` to point `/api` requests to the backend during development to avoid CORS.
6. Add tests for critical code paths (controllers and frontend components).
7. Add `backend/README.md` and a short `docs/` folder for API examples and seeding usage.
8. (Optional) Dockerize frontend/backend and add a `docker-compose` for local dev.

## Quick checklist I can perform for you
- Add `start`/`dev` scripts to `backend/package.json`.
- Recreate `backend/README.md` and `docs/API.md` (with examples and curl commands).
- Generate an OpenAPI spec for the current endpoints.
- Add a `vite.config.js` proxy or `package.json` proxy configuration.

I created this documentation file at: [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)

Which of the quick checklist items shall I do next? (pick one or ask for another.)
