# Environment Setup Guide

This guide provides the necessary environment variables required to run the **Survey App**.

---

## Backend Environment Variables

Create a `.env` file inside the `Backend` directory and add the following:

```env
PORT=3000  # Backend Port  
MONGO_URL=your_mongodb_connection_string  # MongoDB connection URL  
CORS_ORIGIN=http://localhost:5173  # CORS origin (Frontend URL)
```

# JWT Settings  
JWT_SECRET=your_jwt_secret  # JWT Secret key  

---

## Frontend Environment Variables

Create a `.env` file inside the `Frontend` directory and add the following:

```env
VITE_API_BASE_URL=http://localhost:3000/api  # Backend API base URL
```

---

## Setting Up Your Port

If running the backend on **port 3000**, the environment variable `VITE_API_BASE_URL` in the frontend `.env` file should be set to:

VITE_API_BASE_URL=http://localhost:3000/api  

---

## Final Steps

1. Create `.env` files in both `Backend` and `Frontend` directories.  
2. Fill in the necessary credentials (e.g., `MONGO_URL`, `JWT_SECRET`).  
3. Restart the servers after setting up the environment variables.  

---

Now you're ready to run your **Survey App**! 🚀
