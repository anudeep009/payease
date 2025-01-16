# PayEase

PayEase is a simple and user-friendly web application that facilitates secure and seamless money transactions between users. Built with modern technologies, PayEase ensures a smooth experience for its users.

## Features

### 1. User Authentication
- **Sign Up**: New users can register an account with their details.
- **Sign In**: Existing users can log in securely to access their account.

### 2. Profile Management
- Update profile information including:
  - Full Name
  - Last Name
  - Password

### 3. Transactions
- Search for users by name.
- Initiate and send money transactions to other users securely.

## Tech Stack

### Frontend
- **React**: Component-based UI development for a dynamic and responsive interface.
- **Tailwind CSS**: Utility-first CSS framework for fast and efficient styling.
- **TypeScript**: Enhances JavaScript with static typing for better code quality and maintainability.

### Backend
- **Node.js**: Server-side runtime for building scalable applications.
- **Express**: Web framework for handling routes and API endpoints.
- **MongoDB**: NoSQL database for efficient and flexible data storage.

## How to Run the Application

### Prerequisites
- **Node.js**: Ensure Node.js is installed on your system.
- **MongoDB**: A running MongoDB instance.

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/anudeep009/paytm-clone.git
   cd payease
   ```

2. **Install Dependencies**
   - For frontend:
     ```bash
     npm install
     ```
   - For backend:
     ```bash
     cd backend
     npm install
     ```

3. **Environment Variables**
   - Create a `.env` file in the `backend` directory with the following:
     ```env
     PORT=5000
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ```

4. **Start the Application**
   - Start the backend server:
     ```bash
     cd backend
     npm run dev
     ```
   - Start the frontend server:
     ```bash
     cd frontend
     npm start
     ```

5. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`.
