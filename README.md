# AI Mystery Room

An interactive detective investigation studio. Write a fictional premise, review the case file that Gemini builds, connect the evidence, and make a suspect accusation.

The web app is React and Vite. The API is Express, MongoDB, and Mongoose. Gemini generation runs on the server. Each case stores its answer privately; public case responses omit the solution until a successful accusation or the attempt limit is reached.

## Requirements

- Node.js 20 or newer
- MongoDB (local or hosted)
- A Google Gemini API key for generating cases

## Run locally

1. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`, `SESSION_SECRET`, and `GEMINI_API_KEY`.
2. Copy `client/.env.example` to `client/.env` if the API is not running at `http://localhost:5000/api/v1`.
3. Install dependencies from the project root and each app, then start both:

   ```sh
   npm install
   npm --prefix server install
   npm --prefix client install
   npm run dev
   ```

   The web app runs at `http://localhost:5173`; the API runs at `http://localhost:5000`.

Set `CLIENT_URL` to the web app origin when it differs from the default. The server exits with a clear message if `MONGODB_URI` or `SESSION_SECRET` is missing. Case generation reports a configuration error if `GEMINI_API_KEY` is missing. `GEMINI_MODEL` defaults to `gemini-3.8-flash`. Never put server credentials in a `VITE_` variable or commit `.env` files.

On Windows, this workspace sets the integrated terminal's default shell to Command Prompt, where `npm run dev` works without changing PowerShell's execution policy. Open a new integrated terminal after opening the project for the setting to take effect. In development, the API accepts localhost and private LAN origins, and the frontend follows the hostname used to open Vite; this supports Vite's alternate port when a previous frontend is still running.

## API outline

- `GET /api/v1/health` — API health
- `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `GET /api/v1/auth/me` — account access
- `GET /api/v1/cases`, `POST /api/v1/cases`, `GET /api/v1/cases/:id` — private case files
- `PATCH /api/v1/cases/:id/progress` — reviewed and saved exhibits, notebook notes
- `POST /api/v1/cases/:id/accuse` — deterministic accusation evaluation, up to three attempts

Protected endpoints use a bearer token. All case operations are scoped to the authenticated owner. Generated cases are checked for suspect counts, unique IDs, solution membership, and evidence references before storage.

## Current media behavior

Conversation and document exhibits render as case file UI. CCTV and photo exhibits are clearly marked simulations or image references; Gemini text generation does not create photographs or video. No external media generator is configured.

## Product specification

`spec.md` is the product source of truth. This foundation implements the core create, investigate, take notes, and accuse loop. Deployment, automated test suites, richer evidence validation and repair, accessibility review, and optional media generation remain follow-up work before production readiness.
