# AI Merch Designer

AI Merch Designer is a small full-stack merch customization app with a React frontend and an Express/MongoDB backend. It lets users upload artwork or generate a concept with AI, preview that design on different products, and submit an order.

## What it does

- Upload a custom image for use on merch
- Choose from prompt templates for AI-assisted design generation
- Select products such as t-shirts, hoodies, mugs, totes, stickers, and posters
- Preview the selected design before checkout
- Submit orders and view recent order history
- Persist orders and saved designs in MongoDB

## Project structure

```text
.
├── client/   # Vite + React frontend
├── server/   # Express + MongoDB API
└── vercel.json
```

## Tech stack

- Frontend: React 18, React Router, Vite, Lucide React, React Dropzone
- Backend: Express, Mongoose, Multer, CORS, dotenv
- Database: MongoDB
- Deployment: Vercel

## Local development

### 1. Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 2. Configure environment variables

Create `server/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3001
```

`MONGODB_URI` is required. The server will fail fast if it is missing.

### 3. Start the backend

```bash
cd server
npm run dev
```

The API runs on `http://localhost:3001` by default.

### 4. Start the frontend

In a second terminal:

```bash
cd client
npm run dev
```

The Vite app runs on `http://localhost:5173` by default.

## Available scripts

### Client

```bash
npm run dev
npm run build
npm run preview
```

### Server

```bash
npm run dev
npm start
```

## API endpoints

The backend currently exposes these routes:

- `GET /api/health` - health check and MongoDB connection state
- `POST /api/upload` - upload a single image file under the `image` field
- `POST /api/orders` - create an order
- `GET /api/orders` - list the 50 most recent orders
- `POST /api/designs` - save a design record
- `GET /api/designs` - list the 20 most recent designs
- `POST /api/mockup` - placeholder mockup endpoint

Uploaded files are served from `./uploads` through `/uploads/...`.

## Deployment

This repository includes a `vercel.json` that builds:

- the Express API from `server/index.js`
- the static frontend from `client/`

For production deployment, keep secrets in Vercel environment variables rather than in committed config files.

## Current status

This project is functional as a prototype, but a few parts are still incomplete:

- mockup generation is a placeholder and currently returns the original design
- the UI references an AI helper module for design generation that is not present in the current `client/src` tree
- checkout simulates payment flow and does not integrate a real payment processor yet

## Notes for further work

- add a real AI image generation adapter for the design studio
- connect product mockups to a real service such as Segmind
- add validation, authentication, and admin order management
- move production secrets fully into environment configuration