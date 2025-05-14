# Environment Setup Guide

This guide provides the necessary environment variables required to run the **Survey App**.

---

## Backend Environment Variables
Create a `.env` file inside the `Backend` directory and add the following:

```env
PORT=your_port  # Example: 5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_SECRET_2=your_jwt_secret_2
JWT_REFRESH_SECRET=your_jwt_refresh_secret
Frontend Environment Variables
Create a .env file inside the Frontend directory and add the following:

env
Copy
Edit
VITE_API_BASE_URL=http://localhost:your_port/api
Setting Up Your Port
Replace your_port with your desired port number. Example:

If running the backend on port 5000, set:

env
Copy
Edit
VITE_API_BASE_URL=http://localhost:5000/api
Final Steps
Create .env files in both Backend and Frontend directories.

Fill in the necessary credentials and replace placeholders with actual values (like your_port, your_mongodb_connection_string, your_jwt_secret, etc.).

Restart the servers after setting up environment variables.

Now you're ready to run Survey App! 🚀
