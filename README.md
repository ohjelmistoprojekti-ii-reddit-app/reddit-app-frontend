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

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
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

![UI demo layout](/images/ui_layout.png)