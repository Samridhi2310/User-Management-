# User Management System Backend

A RESTful API backend for managing user accounts with authentication and CRUD operations. This project provides endpoints to support user registration, login, profile retrieval, updating, and deletion.

## Features

- **User Registration**
  - Create a new user account and store user details in MongoDB.
- **User Authentication**
  - Log in with credentials to receive authentication (session or JWT-based).
- **User Profile**
  - Fetch authenticated user's profile details.
  - Update user profile information.
  - Delete user account from the system.

## Technologies Used

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Languages:** JavaScript

## Folder Structure

## API Endpoints

| Method | Endpoint               | Description                   |
|--------|----------------------- |-------------------------------|
| POST   | `/api/signup`          | Register a new user           |
| POST   | `/api/login`           | Authenticate user credentials |
| GET    | `/api/userDetail`      | Fetch user profile            |
| PUT    | `/api/update`          | Update user profile           |
| DELETE | `/api/delete/:id`      | Delete user account           |
| POST   | `/api/logout`          | Delete user account           |


## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/user-management.git

   cd backend
2. Install dependencies:
   npm install
3. Run the development server:
    npm run start
    # or
    yarn start
4. Open in browser:
   http://localhost:8000