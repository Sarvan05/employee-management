# Employee Task Tracker

A fullstack application for managing employees and tasks.

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express, Sequelize, SQLite
- **Authentication**: JWT, Role-based (Admin/Employee)

## Setup Instructions

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   The server runs on `http://localhost:5000`.
   Default Admin User: `admin@company.com` / `admin123`

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app runs on `http://localhost:5173`.

## API Endpoints

### Auth
- `POST /api/auth/login`: Login user
- `POST /api/auth/register`: Register new employee (Admin only)

### Employees
- `GET /api/employees`: List all employees
- `GET /api/employees/:id`: Get employee details
- `PUT /api/employees/:id`: Update employee (Admin only)
- `DELETE /api/employees/:id`: Delete employee (Admin only)

### Tasks
- `GET /api/tasks`: List tasks (Filtered by user role)
- `POST /api/tasks`: Create task (Admin only)
- `PUT /api/tasks/:id`: Update task
- `DELETE /api/tasks/:id`: Delete task (Admin only)
- `GET /api/tasks/dashboard`: Get dashboard stats

## Assumptions
- SQLite is used for simplicity.
- Admin user is created automatically on first run.
