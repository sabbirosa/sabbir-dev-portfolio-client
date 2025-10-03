# Frontend Architecture

- Framework: Next.js App Router
- UI: Shadcn UI components
- Auth: Context-based with JWT in HttpOnly cookies
- State: React Context + server actions
- API: Internal Next.js route handlers; server repo for core APIs

## Structure
- app/: routes and layouts
- components/: reusable UI
- contexts/: providers like AuthContext
- lib/: helpers and auth utilities
- server/: Next.js API middleware and models
