# 📝 Survey App

A full-stack **Survey Application** built with React, Node.js, Express, MongoDB, and styled using Tailwind CSS.

Users can register, log in, submit surveys, and view their submissions. Admins have a separate login to access all user-submitted surveys.

---

## 🚀 Features

### 👤 User
- Register and login
- Submit new surveys
- View previously submitted surveys

### 🛠️ Admin
- Secure admin login
- View all user-submitted surveys

---

## 🧰 Tech Stack

- **Frontend**: React.js  
- **Backend**: Node.js + Express  
- **Database**: MongoDB  
- **Styling**: Tailwind CSS  

---

## 📦 Installation (Single Bash Script)

> Follow the steps below to set up both the frontend and backend using **npm**.

```bash
# Clone the repository
git clone https://github.com/your-username/survey-app.git
cd survey-app

# Backend setup
cd Backend
npm install

# After installing dependencies, create a .env file in the Backend folder with the following environment variables:
# 
# PORT=your_port
# MONGO_URL=your_mongo_url
# JWT_SECRET=your_jwt_secret
#
# Replace `your_port` with your desired backend port (e.g., 5000), `your_mongo_url` with your MongoDB connection URL,
# and `your_jwt_secret` with a secure JWT secret key for token generation.

# Start the backend server
npm run dev &

cd ..

# Frontend setup
cd Frontend
npm install

# After installing dependencies, create a .env file in the Frontend folder with the following environment variable:
#
# VITE_API_BASE_URL=http://localhost:3000/api
#
# Replace `http://localhost:3000/api` with your backend URL if different.

# Start the frontend
npm run dev
