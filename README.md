# Employee Management System

A robust, full-stack application designed to streamline employee and task management within an organization. This system features a secure, role-based environment where administrators manage the workforce and employees track their assigned tasks.

## 🚀 Project Overview

### 🌐 Live Demo
**Frontend Hosted on Netlify:** [Click Here to Visit](https://main--proyouassignment.netlify.app/)

This project is an **Employee Task Tracker** built with a modern tech stack. It solves the problem of decentralized task management by providing a unified dashboard for administrators to oversee project progress and for employees to stay organized.

### 🔑 Key Workflow: Admin-Controlled Access
**Security is a priority.** Unlike public applications, this system does **not** allow open registration.
*   **Admins** are the only users who can create new employee accounts.
*   **Employees** cannot register themselves. They must receive their login credentials (email & password) from an administrator.
*   Once logged in, employees can view their specific tasks and update their status, but cannot access administrative features.

## ✨ Features

### 🛡️ Admin Role
*   **User Management**: Create and delete employee accounts.
*   **Task Management**: Create new tasks, assign them to specific employees, and set due dates.
*   **Dashboard**: View high-level metrics like Total Employees, Total Tasks, and Task Completion Rates.
*   **Full Access**: View and manage all tasks across the organization.

### 👤 Employee Role
*   **Task View**: Access a personalized list of tasks assigned specifically to them.
*   **Status Updates**: Update the status of tasks (e.g., Pending → In Progress → Completed).
*   **Read-Only Profile**: View their own profile details (managed by Admin).

## 🛠️ Tech Stack

**Frontend:**
*   **React.js** (Vite): Fast, modern UI library.
*   **Tailwind CSS**: Utility-first styling for a clean, responsive design.
*   **Lucide React**: Beautiful, consistent icons.
*   **Axios**: For API communication.

**Backend:**
*   **Node.js & Express**: Robust server-side runtime.
*   **SQLite**: Lightweight, serverless relational database (via Sequelize ORM).
*   **JWT (JSON Web Tokens)**: Secure, stateless authentication.
*   **Bcrypt**: Password hashing for security.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v14 or higher)
*   npm (Node Package Manager)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/Sarvan05/employee-management.git](https://github.com/Sarvan05/employee-management.git)
    cd employee-management
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    npm start
    ```
    *The server will start on `http://localhost:5000`.*

3.  **Frontend Setup** (Open a new terminal)
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    *The application will run on `http://localhost:5173`.*

## 🔐 Default Login Credentials

The system comes pre-seeded with an Admin and an Employee account for testing.

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@company.com` | `admin123` |
| **Employee** | `employee@company.com` | `employee123` |

## 🌐 Deployment

This project is configured for a split deployment:
*   **Backend**: Hosted on **Render** (Web Service).
*   **Frontend**: Hosted on **Netlify** (Static Site). [Visit Live Site](https://main--proyouassignment.netlify.app/)

The frontend communicates with the backend via the `VITE_API_URL` environment variable.

## 📸 Screenshots

<!-- Add screenshots of the application here -->

## 🎥 Screen Recording

<!-- Add a screen recording or demo video here -->
