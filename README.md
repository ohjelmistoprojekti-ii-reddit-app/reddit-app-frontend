# Reddit Trend Analyzer

This is the frontend service for a web application that:
- fetches **trending Reddit topics**
- analyzes the **sentiment** of public discussions
- and enables **filtering topics by sentiment** (positive, negative, neutral)

> 🚧 This project is in early development.

## 🛠️ Tech Stack (Planned)

- **Language:** TypeScript
- **Framework:** Next.js   
- **UI library:** Shadcn/ui to utilize customizable components
- **Data handling:** TanStack Query or Axios

## Usage

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Project structure suggestion
A best practice Next.js project structure by Binaya Bajracharya shared on [DEV Community](https://dev.to/bajrayejoon/best-practices-for-organizing-your-nextjs-15-2025-53ji) that we could follow:
```
src/
├── app/                   # App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── (routes)/          # Grouped routes
├── components/            # Shared components
│   ├── ui/                # UI components
│   └── features/          # Feature-specific components
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
├── styles/                # Global styles
├── types/                 # TypeScript type definitions
└── context/               # React Context providers
```

## Next.js file based routing
For example:
```
app (rendered at route -> '/')
├── layout.tsx (required root layout)
├── page.tsx (UI rendered at a specific route)
|   
└── topics (rendered at route -> '/topics')
    ├── layout.tsx (optional for nested routes) 
    ├── page.tsx
    │
    └── [id] (dynamically rendered at route -> '/topics/[id]')
        └── page.tsx
```

## Server vs client components
Layouts and pages are server components by default. Data fetching and API connections can be executed using server components. It's best practice to use client components for components that require user interactivity involving state or event handlers e.g. onClick/onChange. Use client directive to declare component to rendered on the client side:
```typescript
"use client";
```

## Next.js docs

- [Next.js Documentation](https://nextjs.org/docs)

## Basic architecture plan
The frontend application handles the UI and user interaction using React. Frontend fetches and posts data via REST APIs exposed by Flask backend.

```mermaid
sequenceDiagram
    Browser ->> React frontend: Page request
    React frontend->>Flask backend: HTTP request
    Flask backend ->> React frontend: JSON response
    React frontend-->>Flask backend: Next.js API Route call
    Note right of React frontend: Optional:<br/>Form handling, <br/>auth token storage, <br/> proxy requests?
    Flask backend -->> React frontend: JSON response
    React frontend ->> Browser: Page render
```

## UI layout plan
A front page sketch of trending Reddit topics ideated by the development team and produced using ChatGPT.  
- **Trending posts** page showing top Reddit topics and displaying their sentiment based on public discussion
- **Map view** available to navigate the world map to discover the most discussed topics geographically
- **Topic search** for text search on the desired Reddit topic
- **Sign in - Sign out** for user login  

![UI demo layout](./public/images/ui_layout.png)