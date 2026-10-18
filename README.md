
# Taskly — MERN Todo App

A full-stack Todo application built with the MERN stack. Taskly allows users to create an account, sign in, and manage their personal tasks through a responsive interface.
  
**Live Demo:** https://taskly-todo-three.vercel.app
**Backend Health Check:** https://taskly-backend-sthl.onrender.com/

## Features

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected user profile and Todo API routes
- Create, read, update, and delete Todos
- User-specific Todo data isolation
- Client-side form validation
- Password visibility toggle
- Forgot-password email flow
- Axios API integration with automatic token attachment
- Toast notifications
- Responsive UI with Tailwind CSS and DaisyUI
- React Router navigation

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Axios
- Tailwind CSS
- DaisyUI
- Lucide React
- React Hot Toast

### Backend
- Node.js
- Express 5
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- CORS
- dotenv
- Nodemailer

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

## Architecture

```text
Browser
   |
   v
React + Vite Frontend
   |
   | HTTPS requests through Axios
   v
Express REST API
   |
   | Mongoose
   v
MongoDB Atlas
```

## Project Structure

```text
Taskly-Todo/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   └── utils/
│   ├── package.json
│   └── ...
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- Git
- A MongoDB database, such as MongoDB Atlas

### 1. Clone the repository

```bash
git clone https://github.com/devahmadraza/Taskly-Todo.git
cd Taskly-Todo
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

Open a second terminal from the repository root:

```bash
cd frontend
npm install
```

## Environment Variables

Create `backend/.env` for local development:

```env
PORT=2001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your_email_address
```

Use the exact environment variable names expected by the backend and email configuration. Add any additional email-provider credentials required by your email utility.

Never commit real credentials, database connection strings, or secrets.

## Running Locally

### Start the backend

From the `backend` directory:

```bash
npm run dev
```

The backend uses port `2001` by default when `PORT` is not configured.

Health-check endpoint:

http://localhost:2001/

Expected response:

```text
Backend Live
```

### Start the frontend

From the `frontend` directory, in a separate terminal:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

**API configuration:** The current Axios instance uses the deployed backend URL. For local development, update the `baseURL` in `frontend/src/utils/axiosInstance.js` to:

```js
baseURL: "http://localhost:2001/api"
```

Restore the production URL before deploying unless you change the application to use environment-based configuration.

## API Routes

All API routes below use the `/api` prefix, except the root health check.

| Method | Endpoint | Authentication | Purpose |
|---|---|---|---|
| GET | `/` | No | Backend health check |
| POST | `/api/auth/register` | No | Register a user |
| POST | `/api/auth/login` | No | Log in |
| GET | `/api/auth/me` | Required | Get the authenticated user's profile |
| POST | `/api/auth/forgot-password` | No | Request a password-reset email |
| POST | `/api/todos` | Required | Create a Todo |
| GET | `/api/todos` | Required | Get the authenticated user's Todos |
| PUT | `/api/todos/:id` | Required | Update a Todo |
| DELETE | `/api/todos/:id` | Required | Delete a Todo |

Protected endpoints use JWT bearer authentication. The frontend Axios instance attaches the stored token to requests when available.

## Deployment

### Frontend — Vercel

- Set the project root directory to `frontend`.
- Use `npm run build` as the build command.
- Use `dist` as the output directory.
- Ensure the frontend calls the deployed backend.
- Configure SPA routing so direct visits to React Router routes work correctly.

### Backend — Render

- Set the service root directory to `backend`.
- Use `npm install` as the build command.
- Use `npm start` as the start command.
- Configure the required environment variables in Render.
- Ensure CORS allows the deployed frontend origin.

### Database — MongoDB Atlas

- Configure `MONGODB_URI` in the backend environment.
- Verify database-user permissions and network access.
- Keep database credentials out of the repository.

## Security Notes

- Passwords are hashed on the backend before storage.
- Protected routes require authentication.
- Todo operations are scoped to the authenticated user.
- Validate incoming data on the backend.
- Use HTTPS for production requests.
- Restrict CORS to trusted frontend origins.
- Never expose private secrets in frontend environment variables or commit them to Git.

## Troubleshooting

### API requests fail

- Check the request URL in the browser's Network tab.
- Verify the backend is running and reachable.
- Check CORS configuration and Render logs.
- Confirm the frontend uses the correct API base URL.

### A page returns 404 after refresh

- Check the Vercel SPA routing configuration.
- Verify the frontend root directory is `frontend`.

### Backend fails to start

- Review Render logs.
- Confirm the start command is `npm start`.
- Check required environment variables.
- Verify the MongoDB connection string and Atlas network settings.

## Future Improvements

- Automated frontend and backend tests
- Environment-based API URL configuration
- API documentation with Swagger or OpenAPI
- Todo search, filtering, and pagination
- Improved accessibility and error handling
- Continuous integration checks

## Author

**Ahmad Raza** — MERN Stack Developer

GitHub: https://github.com/devahmadraza

## License

No license has been specified. Until a license is added, others should not assume they have permission to reuse, modify, or distribute this project.
