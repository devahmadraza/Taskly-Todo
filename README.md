# Taskly — MERN Todo App

A full-stack task management application built with the MERN stack. Taskly helps users organize their work by managing tasks through a clean, responsive interface, with account authentication and a REST API.

> **Live demo:** [Open Taskly](https://taskly-todo-three.vercel.app)  
> **Backend health check:** [Taskly API](https://taskly-backend-sthl.onrender.com/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [API Routes](#api-routes)
- [Deployment](#deployment)
- [Security Notes](#security-notes)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)
- [Author](#author)
- [License](#license)

## Overview

Taskly is a full-stack Todo application with a React frontend and an Express backend connected to MongoDB. The frontend communicates with the backend through HTTP API requests. Authentication routes support account registration and login, while the Todo API handles task-related operations.

The application is deployed with the frontend on Vercel and the backend on Render.

## Features

- User registration and login
- Password visibility toggle on authentication forms
- Client-side form validation
- REST API built with Express
- MongoDB database integration
- Todo management through dedicated API routes
- Axios instance for shared API configuration
- JWT bearer token attached to requests when a token is available
- Responsive interface using Tailwind CSS and DaisyUI
- Toast notifications for user feedback
- Separate frontend and backend applications

> Document only features that are implemented and tested in your current deployed version.

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Tailwind CSS
- DaisyUI
- Lucide React
- React Hot Toast

### Backend
- Node.js
- Express
- MongoDB
- Mongoose (if used by the current backend)
- JSON Web Tokens (JWT), if enabled in the authentication flow
- CORS
- dotenv

### Deployment
- Vercel — frontend
- Render — backend
- MongoDB Atlas — database hosting (if this is the database configured for production)

## Architecture

```text
Browser
  |
  v
React + Vite frontend (Vercel)
  |
  | HTTPS / Axios
  v
Express REST API (Render)
  |
  v
MongoDB database
```

## Project Structure

The repository is organized into separate frontend and backend folders:

```text
TasklyTodo/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   ├── public/
│   ├── package.json
│   └── ...
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── package.json
│   └── ...
└── README.md
```

> Your actual filenames may differ. Adjust this tree to match the repository before publishing.

## Getting Started

### Prerequisites

Install the following before running the project locally:

- Node.js (a current LTS version is recommended)
- npm
- A MongoDB database (local MongoDB or MongoDB Atlas)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/devahmadraza/Taskly-Todo.git
cd Taskly-Todo
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open a second terminal from the repository root:

```bash
cd backend
npm install
```

## Environment Variables

Create environment files locally. Never commit real secrets.

### Frontend — `frontend/.env`

```env
VITE_API_URL=http://localhost:2001/api
```

If your Axios instance uses `baseURL: import.meta.env.VITE_API_URL`, call routes with paths such as `/auth/login` and `/auth/register` (without repeating `/api`).

For production, set the frontend API variable in Vercel to the deployed API base URL:

```env
VITE_API_URL=https://taskly-backend-sthl.onrender.com/api
```

Only use `VITE_API_URL` if your frontend code actually reads that variable. If `axiosInstance.js` hardcodes the production base URL, configure that file instead or update the code consistently.

### Backend — `backend/.env`

Use the variable names expected by your backend code. A typical setup may look like:

```env
PORT=2001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
```

Your project may use a different MongoDB variable name (for example, `MONGO_URI`) or may not use JWT yet. Check `backend/src/config/db.js` and the authentication code, and use the exact names expected there. Do not paste real passwords or tokens into this README.

## Running Locally

### Start the backend

From the `backend` directory:

```bash
npm run dev
```

If your backend does not define a `dev` script, use the script listed in `backend/package.json`, such as:

```bash
npm start
```

The API should be available at:

```text
http://localhost:2001
```

The root endpoint should respond with:

```text
Backend Live
```

### Start the frontend

From the `frontend` directory, in a separate terminal:

```bash
npm run dev
```

Vite will print the local development URL in the terminal. Open that URL in your browser.

## API Routes

The backend server registers these route groups:

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/` | Backend health-check response |
| `POST` | `/api/auth/register` | Register a user |
| `/` | `/api/test` | Test routes (specific methods depend on implementation) |
| `/` | `/api/todos` | Todo routes (specific methods depend on implementation) |

The exact methods, request fields, authentication requirements, and response formats depend on the route handlers. Check the files under `backend/src/routes/` for the authoritative API contract.

### Authentication request example

A typical registration request may use this JSON body:

```json
{
  "name": "Example User",
  "email": "user@example.com",
  "password": "Choose-a-strong-password"
}
```

Use the exact fields required by the current controller. Never use a real password in public examples.

## Deployment

### Frontend on Vercel

1. Import the GitHub repository into Vercel.
2. Set the frontend root directory to `frontend`.
3. Set the framework preset to Vite.
4. Set the build command to `npm run build`.
5. Set the output directory to `dist`.
6. Configure the production API base URL in the project's environment variables if the code uses one.
7. Redeploy after changing environment variables or frontend code.

If the app uses React Router, configure an SPA rewrite so direct visits and refreshes on client-side routes work correctly. For Vercel, a `frontend/vercel.json` file may contain:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Backend on Render

1. Create a Web Service connected to the GitHub repository.
2. Set the root directory to `backend`.
3. Use the build command `npm install`.
4. Use the start command defined by the backend package, commonly `npm start`.
5. Add the production environment variables in Render's Environment settings.
6. Confirm the backend starts successfully and its health-check endpoint responds.
7. Configure CORS to allow the exact origins of the deployed frontend(s).

### Database

If using MongoDB Atlas, add the production connection string to Render's environment variables. Ensure the database user has the required permissions and that network access is configured correctly.

## Security Notes

- Never commit `.env` files, database credentials, JWT secrets, or private API keys.
- Keep `.env` files in `.gitignore`.
- Store passwords as secure hashes on the backend; never store plaintext passwords.
- Validate inputs on the backend, even when the frontend validates them too.
- Use HTTPS for production API traffic.
- Configure CORS for the exact frontend origins you control.
- Avoid logging passwords, tokens, or other sensitive authentication data.
- Do not place private secrets in `VITE_` variables; Vite exposes these values to the browser.

## Troubleshooting

### API requests fail in production
- Verify the frontend is using the deployed backend URL rather than `localhost`.
- Check the browser Network tab for the request URL, status code, and CORS errors.
- Check the Render backend logs for startup errors or failed API requests.
- Confirm that CORS allows the frontend's exact origin.

### `404 Not Found` on a refreshed page
- Configure the frontend host to serve `index.html` for client-side routes.
- Confirm the Vercel root directory is set to `frontend`.

### Backend fails to start
- Check Render logs.
- Verify the start command and root directory.
- Confirm all required environment variables are set and their names match the code.
- Verify the database connection string and Atlas access configuration.

## Future Improvements

Potential next steps, depending on project goals:

- Automated tests for frontend and backend
- More detailed API documentation
- Pagination, filtering, and task search
- Password reset and email verification
- CI checks and deployment previews
- Accessibility review and improved error states

## Author

**Ahmad Raza**  
MERN Stack Developer

- GitHub: [@devahmadraza](https://github.com/devahmadraza)

## License

No license has been specified yet. If you want others to reuse, modify, or distribute this project, choose an appropriate open-source license and add a `LICENSE` file. Until then, do not assume the repository is open-source licensed.
