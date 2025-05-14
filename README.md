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
git clone https://github.com/shahzadahamad/survey-app.git

# Navigate to the backend directory
cd Backend

# Install backend dependencies
npm install

# Set up environment variables (Check out ENV_SETUP.md for details)
# Ensure you create a .env file in the backend directory

# Start the backend server
npm run dev &

cd ..

# Open a new terminal window and navigate to the frontend directory
cd ../Frontend

# Install frontend dependencies
npm install

# Set up environment variables (Check out ENV_SETUP.md for details)
# Ensure you create a .env file in the frontend directory

# Start the frontend server
npm run dev
