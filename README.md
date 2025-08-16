# 🧠 Synapse Project

A modern, full-stack note and task management application built with Node.js, Express, React, and MongoDB and OpenCV.

## 🏗️ Project Structure

```
synapse-project/
├── backend/                    # Node.js/Express API server
│   ├── config/                # Configuration files
│   ├── middleware/            # Custom middleware
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   ├── utils/                # Utility functions
│   ├── server.js             # Main server file
│   └── package.json          # Backend dependencies
├── frontend/                  # React application
│   ├── public/               # Static files
│   ├── src/                  # Source code
│   │   ├── components/       # Reusable components
│   │   ├── context/          # React context
│   │   ├── pages/            # Page components
│   │   └── App.js            # Main app component
│   └── package.json          # Frontend dependencies
├── README.md                 # Project documentation
├── .gitignore               # Git ignore rules
└── package.json             # Root package.json for scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git (optional)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd synapse-project
   npm run install-deps
   ```

2. **Set up environment variables:**
   ```bash
   cd backend
   copy .env.example .env
   # Edit .env with your actual values
   ```

3. **Generate JWT Secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. **Start development servers:**
   ```bash
   cd ..
   npm run dev
   ```

### 🌐 Access URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting protection
- Security headers with Helmet
- Input validation and sanitization

### 📝 Note Management
- Create, read, update, delete notes
- Categories and tags
- Pin important notes
- Search functionality
- Rich text content

### ✅ Task Management
- Create and manage tasks
- Priority levels (low, medium, high)
- Due date tracking
- Task completion status
- Category organization

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Loading states and error handling
- Toast notifications
- Modal dialogs
- Confirmation prompts
- Error boundaries

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: express-validator

### Frontend
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: Context API
- **Build Tool**: Create React App

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile

### Notes Endpoints
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create note
- `GET /api/notes/:id` - Get single note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Tasks Endpoints
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion
- `DELETE /api/tasks/:id` - Delete task

## 🔧 Development

### Available Scripts
- `npm run dev` - Start both servers
- `npm run server` - Start backend only
- `npm run client` - Start frontend only
- `npm run install-deps` - Install all dependencies

### Environment Variables
See `backend/.env.example` for all required environment variables.

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Use `npm start` for production
3. Ensure MongoDB connection is configured

### Frontend Deployment
1. Run `npm run build` in frontend directory
2. Serve the `build` folder
3. Configure API proxy for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

Made by Pranit Narayan 
