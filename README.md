# Ganapatih Full-Stack Developer Take-Home Test

This project implements a Reels/TikTok-style news feed built with Next.js 16 frontend and an Express/Sequelize backend backed by PostgreSQL.

Live deployment: https://opulent-journey-56vvp5j5g4q345jq-3000.app.github.dev/

---

## Stack

| Layer    | Tech                                                                                          |
| -------- | --------------------------------------------------------------------------------------------- |
| Frontend | Next.js 16 (App Router), TypeScript, TailwindCSS + shadcn tokens, React Query, Zustand, Radix |
| Backend  | Node.js, Express, Sequelize, PostgreSQL, JWT (access/refresh), Swagger docs                   |
| Tooling  | Docker, docker-compose, Makefile helpers, GitHub Actions, react-hot-toast, lucide-react icons |

---

## Repo Structure

```
.
├── client/                 # Next.js app
│   ├── src/app/            # App Router routes (/ and /feed) + layout/providers
│   ├── src/components/     # Atomic design (atoms/molecules/organisms)
│   ├── src/hooks/          # useAuth, useCurrentUser, useInfiniteFeed
│   ├── src/lib/            # Axios instance, API helpers, timeago, utils, types
│   ├── src/store/          # Zustand auth store
│   ├── src/styles/         # Tailwind globals + custom theme tokens
│   ├── Dockerfile          # Multi-stage Next.js build/start image
│   └── .env.example        # `NEXT_PUBLIC_API_BASE_URL`
│
├── server/                 # Express API
│   ├── controllers/        # Auth/post/follow logic
│   ├── database/           # Sequelize models, migrations, seeders, config
│   ├── routers/            # /register, /login, /posts, /feed, /follow
│   ├── middlewares/        # auth guard, error handler
│   ├── docs/               # Swagger YAML (openapi, auth, posts, follow)
│   ├── Dockerfile          # Builds TS → JS, exposes port 5001
│   └── .env.example        # Postgres creds + JWT secrets
│
├── docker-compose.yml      # db + migration + server + client services
├── Makefile                # `make build`, `make push`, `make up`
├── README.md               # You are here
├── AGENTS.md               # Contributor guidelines
└── test-cases.md           # QA scenarios
```

---

## Environment

1. **Frontend (`client/.env`)**: copy `client/.env.example` and set `NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/api`. Even in Docker/Codespaces the browser runs on your machine, so it must call the API via localhost.
2. **Backend (`server/.env`)**: copy `server/.env.example` and adjust Postgres credentials/JWT secrets. Docker Compose overrides these values for containers; local development can use the same file.

---

## Running with Docker (Recommended)

Everything is orchestrated via `docker-compose.yml` + the Makefile:

- `db`: `postgres:latest` with persisted volume `postgres-data`
- `migration`: one-off container that runs `npm run build && npx sequelize-cli db:migrate && db:seed:all`
- `server`: Express API on http://localhost:5001
- `client`: Next.js frontend on http://localhost:3000 (built with `NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/api`)

### Quick start

```bash
make up        # or: docker compose up --build
```

- Frontend → http://localhost:3000
- API → http://localhost:5001 (Swagger docs at `/api/docs`)
- Database → localhost:5432 (user/password `ganapatih` if using compose defaults)

To wipe data completely:

```bash
docker compose down -v    # removes postgres-data volume
docker compose up --build
```

### Other Makefile targets

| Command      | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| `make build` | Build client + server Docker images (client-app/server-app)   |
| `make push`  | Push those images to your registry (set CLIENT/ SERVER_IMAGE) |
| `make up`    | `docker compose up --build` (migration runs automatically)    |

---
