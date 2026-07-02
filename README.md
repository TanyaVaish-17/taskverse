# TaskVerse

A full-stack MERN task tracker built with a dark editorial aesthetic, drag-and-drop kanban board, and real-time backend analytics.

Built as a technical assignment for the Full Stack Developer Intern role at **COLL-EDGE CONNECT** (via Internshala).

**Live App:** [taskverse-tau.vercel.app](https://taskverse-tau.vercel.app)
**API:** [taskverse-api.onrender.com](https://taskverse-api.onrender.com)

> Note: the backend is hosted on Render's free tier, which spins down after periods of inactivity. The first request after idle time may take 30–50 seconds to respond while it wakes up.

---

## Screenshots

<!-- Add your screenshots below by replacing the placeholder paths. See "Adding Screenshots" section further down for exact folder instructions. -->

### Kanban Board
![TaskVerse Board](./screenshots/board.png)

---

## Overview

TaskVerse is a kanban-style task management app that goes beyond basic CRUD. Instead of a flat task list, tasks live on a drag-and-drop board across three columns — To Do, In Progress, and Done — with filtering, sorting, tagging, live analytics, and a command palette for quick actions.

## Features

### Core
- Full CRUD on tasks (create, read, update, delete)
- Drag-and-drop kanban board across three statuses
- Form validation on both frontend and backend
- REST API built with Express and MongoDB
- Fully responsive layout
- Real-time UI updates without page refresh, using optimistic updates with automatic rollback on failure

### Bonus
- Filtering by priority, tags, and due date
- Sorting by due date, priority, or creation date
- Toast notifications for all actions
- Reusable UI component library (Button, Input, Textarea, Select, Modal, Badge)
- Environment variable based configuration

### Extra
- Command palette (Ctrl/Cmd + K) for quick task search and creation
- Collapsible sidebar with icon-only collapsed state and mobile off-canvas drawer
- Backend-aggregated analytics strip: total tasks, done count, overdue count, completed this week
- Priority badges and overdue due-date highlighting
- Dark, editorial visual identity with a custom serif/sans type pairing — not a default component-library look

## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Framer Motion (animations)
- @dnd-kit (drag and drop)
- React Hook Form + Zod (form validation)
- React Hot Toast (notifications)
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- MongoDB aggregation pipeline for analytics

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Project Structure

```
taskverse/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/     # Navbar, Sidebar, Layout
│   │   │   ├── tasks/      # Board, Column, TaskCard, TaskForm, CommandPalette, AnalyticsStrip
│   │   │   └── ui/         # Reusable Button, Input, Modal, Badge, etc.
│   │   ├── hooks/          # useTasks, useAnalytics
│   │   ├── services/       # Axios API layer
│   │   ├── schemas/        # Zod validation schemas
│   │   └── utils/          # Filtering and sorting helpers
│   └── .env
│
├── server/                  # Express backend
│   ├── config/              # MongoDB connection
│   ├── controllers/         # Route handlers
│   ├── models/               # Mongoose schemas
│   ├── routes/                # API routes
│   └── .env
│
└── README.md
```

## Getting Started Locally

### Prerequisites
- Node.js (v18+)
- A MongoDB Atlas account (or local MongoDB instance)

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/taskverse.git
cd taskverse
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run the server:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../client
npm install
```

Create a `.env` file in `client/`:
```
VITE_API_URL=http://localhost:5000/api
```

Run the client:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Reference

| Method | Endpoint               | Description                        |
|--------|-------------------------|-------------------------------------|
| GET    | `/api/tasks`             | Get all tasks                       |
| GET    | `/api/tasks/:id`          | Get a single task                   |
| POST   | `/api/tasks`               | Create a new task                   |
| PUT    | `/api/tasks/:id`           | Update a task                       |
| DELETE | `/api/tasks/:id`            | Delete a task                       |
| PATCH  | `/api/tasks/reorder`         | Update status/order for drag-and-drop |
| GET    | `/api/tasks/analytics`        | Get aggregated task analytics       |

## Design Decisions

- **Dark editorial theme** — a warm near-black background with a serif/sans type pairing (Fraunces + Inter) instead of a default component-library look.
- **Optimistic updates with rollback** — the UI updates instantly on create/edit/delete/reorder, then syncs with the server and reverts automatically if the request fails, satisfying the "dynamic updates without refresh" requirement with a more resilient approach than a simple refetch.
- **Backend aggregation for analytics** — the stats strip is powered by a MongoDB aggregation pipeline on the server rather than being computed client-side, to demonstrate real database-level aggregation.
- **Custom component library** — Button, Input, Modal, etc. were built from scratch rather than using a UI kit, to keep the interface visually distinct and avoid a templated feel.

## Author

**Tanya**
B.Tech CSE, KIET Group of Institutions

---

Built as a technical assignment submission for COLL-EDGE CONNECT.