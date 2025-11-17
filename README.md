# Ganapatih Full-Stack Developer Take-Home Test

This repository hosts an Express/Sequelize backend (`server/`) and a Reels-style Next.js frontend (`client/`). The client uses the App Router, Tailwind + shadcn tokens, React Query, Zustand, Axios, and Radix Dialog to deliver the two required pages: a combined login/register screen and a TikTok-inspired feed with optimistic posting, follow toggles, and infinite scroll.

## Project Setup

1. Duplicate `.env.example` into `.env` (root) and update `NEXT_PUBLIC_API_BASE_URL` if your backend runs on a different host/port.
2. Install dependencies:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
3. Start the backend (ensure PostgreSQL env vars are configured) and run the frontend:

   ```bash
   # server
   npm run dev

   # client
   npm run dev
   ```

4. Visit `http://localhost:3000` to register or log in; successful auth redirects to `/feed`.

## Environment Variables

| Name                       | Description                                                              |
| -------------------------- | ------------------------------------------------------------------------ |
| `NEXT_PUBLIC_API_BASE_URL` | Base REST URL for the Express API (default `http://localhost:5001/api`). |

## Atomic Design

The UI follows the requested structure inside `client/src/components`:

- **atoms** – foundational UI primitives (button, input, card, textarea, badge, spinner, avatar).
- **molecules** – reusable feature slices like `AuthForm`, `PostCard`, `PostComposer`, `FollowButton`.
- **organisms** – higher-level compositions (`AuthLayout`, `ProtectedLayout`, `Navbar`, `FeedList`) that orchestrate page sections.

## Architecture Overview

The client is a Next.js 16 App Router app located in `client/src/app`. React Query powers data fetching + infinite scroll, Zustand handles in-memory access tokens, and Axios centralizes HTTP logic. Desktop users see one card at a time with keyboard-style arrows, while mobile users scroll through a stacked feed. All toasts are provided via `react-hot-toast`.

## Authentication Flow

`/` renders a switchable login/register form. Login stores the JWT access token in Zustand, the refresh token in `localStorage`, sets a lightweight session cookie for middleware, fires a toast, and redirects to `/feed`. Registering toasts success and flips back to the login tab. `/feed` is wrapped with a `ProtectedLayout` and guarded by both middleware and the `useAuth` hook; unauthorized visits are redirected to `/`.

## Refresh Token Logic

The Axios instance attaches the access token to every request. On a 401 it triggers a refresh call (using the stored refresh token), updates the store with the new access token, replays the original request, and shows a toast on failure. A background `initializeFromRefresh` method also runs on mount so protected views silently hydrate if a refresh token exists. Logout clears both tokens, removes the session cookie, and surfaces a success toast.

## CI/CD

`.github/workflows/frontend.yml` runs on pushes/PRs touching the frontend. It checks out the repo, sets up Node.js 20, installs dependencies inside `client/`, executes `npm run lint`, and then `npm run build`. The workflow is publish-ready if you later add a Vercel deploy step.

## Backend Connection

The frontend communicates exclusively through the REST endpoints implemented in `server/`:

- `POST /api/register`, `POST /api/login`, `POST /api/refresh-token`
- `POST /api/posts`
- `POST /api/follow/:user_id` & `DELETE /api/follow/:user_id`
- `GET /api/feed?page=1&limit=10`

Feed responses must include each post’s user metadata (`is_following`, follower/following/post counts). The UI performs optimistic updates for post creation (new card jumps to the top) and follow toggles (counts adjust immediately). Infinite scrolling loads the next page once you approach the last five posts on desktop and via an intersection observer on mobile.
