# User Management System Frontend

A web application frontend for managing user accounts with authentication and CRUD operations. This project allows users to sign up, log in, and manage their profile information through a secure dashboard.

## Features

- **User Registration**
  Users can create an account by providing their details.

- **User Authentication**
  Registered users can log in with their credentials to access protected pages.

- **User Dashboard**
  After logging in, users can:
  - View their profile information.
  - Update account details.
  - Delete their account.

## Technologies Used

- **Framework:** Next.js (App Router)
- **Languages:** JavaScript, HTML, CSS

## Folder Structure

/app
├── login
│ ├── userDetail
│ │ ├── delete
│ │ │ └── page.js # Page to delete user data
│ │ ├── update
│ │ │ └── page.js # Page to update user profile
│ │ └── page.js # View user details
│ └── page.js # Login page
├── signUp
│ └── page.js # Sign-up (registration) page


## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-management-frontend.git


1. Navigate to the project folder:
   cd frontend
2. Install dependencies:
   npm install
   # or
   yarn install
3. Run the development server:
    npm run dev
    # or
    yarn dev
4. Open in browser:
   http://localhost:3000