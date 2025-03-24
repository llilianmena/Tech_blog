# CMS-Style Blog Site

## Description
This project is a CMS-style blog site where users can create an account, log in, write blog posts, comment on posts, and manage their own content. It includes a homepage displaying all existing blog posts and a user-specific dashboard for managing personal posts.

## Features

### User Experience
- **Homepage:**
  - Displays existing blog posts, if any.
  - Includes navigation links to the homepage, dashboard, and login/signup options.
- **Navigation Links:**
  - Accessible links to homepage and dashboard.
  - Login/signup prompts when attempting to access restricted pages without authentication.

### User Authentication
- **Sign Up:**
  - Users can create a new account by providing a username and password.
  - Credentials are securely saved, and users are logged in automatically after signing up.
- **Sign In:**
  - Returning users can log in using their saved username and password.

### Blog Post Interaction
- **Homepage Display:**
  - Shows post titles and dates for all existing blog posts.
- **Post Details:**
  - Clicking on a post reveals the full content, creator's username, and date.
  - Logged-in users can leave comments on posts.
- **Comments:**
  - Comments include the username and date of the commenter.

### Dashboard
- **User Posts:**
  - Displays all blog posts created by the logged-in user.
  - Offers an option to create new blog posts.
- **New Blog Post:**
  - Users provide a title and content, which are saved and displayed on the dashboard.
- **Update/Delete Posts:**
  - Users can update or delete their existing posts directly from the dashboard.

### Logout and Inactivity
- **Logout:**
  - Users can log out anytime, which removes access to dashboard features.
- **Session Timeout:**
  - After a period of inactivity, users must log in again to interact with posts (viewing remains available).

## Installation
1. Clone the repository.
2. Install dependencies with `npm install`.
3. Configure environment variables for database and session handling.
4. Run the application with `npm start`.