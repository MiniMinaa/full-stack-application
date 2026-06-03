# Lamp Review App

A full-stack application for browsing and reviewing lamps. Users can browse publicly, and authenticated users can add lamps and leave reviews.

## Deployed URLs

Frontend: https://full-stack-application-i3po.vercel.app

Backend: https://full-stack-application-0cdd.onrender.com

## Tech Stack

Frontend: React 19, Vite, TypeScript, Auth0 React SDK, Lucide React, deployed on Vercel

Backend: Node.js, Express, TypeScript, deployed on Render

Database: PostgreSQL with Prisma ORM, hosted on Render

Auth: Auth0 with JWT and RS256

Testing: Vitest and Supertest

CI/CD: GitHub Actions

## Local Development

Prerequisites: Node.js 20 and Docker.

Clone the repository:

```bash
git clone https://github.com/MiniMinaa/full-stack-application.git
cd full-stack-application
```

Create `backend/.env`:

```
PORT=5000
AUTH0_AUDIENCE=https://full-stack-app
AUTH0_ISSUER_BASE_URL=https://dev-dkt7wl5hjhqhhc08.us.auth0.com
CLIENT_ORIGIN=http://localhost:4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/lamp_review
```

Create `frontend/.env`:

```
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=your-auth0-audience
VITE_API_URL=http://localhost:5000
```

Start the local database:

```bash
docker-compose -f docker-compose.postgres.yml up -d
```

Install dependencies and generate the Prisma client:

```bash
cd backend && npm install && npx prisma generate && cd ..
```

Run migrations and seed the database:

```bash
npm run migrate
cd backend && npm run seed && cd ..
```

Start both frontend and backend:

```bash
npm run dev
```

Frontend runs on http://localhost:4000 and backend on http://localhost:5000.

## Running with Docker

```bash
docker-compose up --build
```

Frontend will be available at http://localhost:4000 and backend at http://localhost:5000.

## API Endpoints

GET /lamps — public, returns all lamps

GET /lamps/:id — public, returns a single lamp with its reviews

POST /lamps — requires authentication, adds a new lamp

POST /lamps/:id/reviews — requires authentication, adds a review

GET /profile — requires authentication, returns the authenticated user profile

## Testing

```bash
cd backend && npm test
```

Tests run automatically on every push to main via GitHub Actions. They cover authentication protection on all routes, CORS headers for allowed origins, and that the X-Powered-By header is not exposed.

## Security Checklist

1. No secrets are committed. All credentials are stored in .env files or GitHub Secrets.

2. CORS is restricted to the frontend deployed URL via the CLIENT_ORIGIN environment variable, not a wildcard.

3. Tokens are never stored in localStorage. Auth0 SDK handles tokens in memory.

4. The deployed backend uses HTTPS, provided automatically by Render.

5. Docker images do not contain .env files or node_modules from the host machine.

6. Auth0 callback and logout URLs are configured for the deployed Vercel URL, not localhost.

## Reflections

**1. Why did you choose this deployment platform? What were the alternatives you considered?**

I chose Vercel for the frontend and Render for the backend and database. Vercel detects the framework automatically and handles builds with no extra configuration. Render was good because it supports Node.js, managed PostgreSQL and environment variables. I considered Railway but since we got a lecture on Render I choose to stick to it.

**2. What challenges did you face with Docker? How did you solve them?**

The main challenge was my port conflicts. when i tried to run the containers, port 5000 was already in use by a leftover Node.js process from a previous development session. I solved it by identifying and killing the process using `lsof -i :5000` and then restarting the containers.

**3. How did you handle environment variables and secrets in production vs locally?**

Locally I used `.env` files for both frontend and backend, which are excluded from the repository via `.gitignore`. In production, all secrets are stored as environment variables directly in the Render and Vercel dashboards. The Docker images do not contain any `.env` files or secrets. The application reads environment variables at runtime from the host environment.

**4. What would you do differently if you had one more week?**

I'm pretty happy about it so far but I would and will keep working on the front end.

**5. How did you ensure that authentication still works after deployment?**

I updated the Auth0 application settings to include the deployed Vercel URL as an allowed callback and logout URL, and restricted CORS on the backend to only accept requests from that URL. I tested login and logout flows on the deployed app directly to confirm tokens were being issued and validated correctly against the production audience. The `withCredentials` flag is set on all authenticated requests to ensure cookies are sent cross-origin.
