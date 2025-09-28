# 🚀 Fullstack Intern Assignment Pack

A complete fullstack application featuring a secure authentication system backend and a modern movie search frontend.

## 📋 Project Overview

This repository contains **two complete assignments**:

1. **🔐 Authentication System Backend** - Secure Node.js/Express API
2. **🎬 Movie Search App Frontend** - Modern Next.js application

## 🏗 Project Structure

```
├── backend/          # Assignment 1: Authentication System
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth & validation middleware
│   │   ├── routes/         # API routes
│   │   ├── lib/           # Utilities (JWT, email, Prisma)
│   │   ├── types/         # TypeScript interfaces
│   │   └── validation/    # Zod schemas
│   ├── prisma/           # Database schema
│   ├── package.json
│   └── README.md
├── frontend/         # Assignment 2: Movie Search App
│   ├── src/
│   │   ├── app/          # Next.js App Router
│   │   ├── components/   # React components
│   │   ├── lib/         # API & utilities
│   │   ├── store/       # Redux store
│   │   └── types/       # TypeScript types
│   ├── public/          # Static assets
│   ├── package.json
│   └── README.md
└── README.md        # This file
```

## ⚡ Quick Start

### 🔧 Prerequisites
- Node.js 18+ 
- MySQL database
- OMDB API key (free from [omdbapi.com](http://www.omdbapi.com/apikey.aspx))

### 🚀 Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your .env file
npm run db:push
npm run dev
```

### 🎨 Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Add your OMDB API key
npm run dev
```

## 🎯 Assignment 1: Authentication System Backend

### ✅ Features Implemented
- **Secure Signup/Login** with JWT authentication
- **Password Hashing** using bcrypt (12 salt rounds)
- **Protected Routes** with JWT middleware
- **Input Validation** using Zod schemas
- **Centralized Error Handling** with consistent responses
- **Role-based Authorization** (USER/ADMIN roles)
- **Password Reset** functionality with email
- **TypeScript** throughout for type safety
- **Prisma ORM** for database operations

### 🛠 Tech Stack
- **Runtime**: Node.js + Express.js
- **Language**: TypeScript
- **Database**: MySQL + Prisma ORM
- **Authentication**: JWT + bcrypt
- **Validation**: Zod
- **Email**: Nodemailer

### 📚 API Endpoints
```
POST /auth/signup          # Register new user
POST /auth/login           # Login user
GET  /auth/me              # Get current user (protected)
POST /auth/reset-password  # Request password reset
POST /auth/confirm-reset   # Confirm password reset
GET  /auth/admin-only      # Admin-only endpoint
```

### 🔒 Security Features
- Password requirements: 8+ chars, uppercase, lowercase, number, special char
- JWT tokens with configurable expiration
- bcrypt hashing with 12 salt rounds
- CORS protection
- Helmet security headers
- Input sanitization and validation

## 🎯 Assignment 2: Movie Search App Frontend

### ✅ Features Implemented
- **Movie Search** with OMDB API integration
- **Autocomplete Search** with debounced suggestions
- **Movie Details** page with comprehensive information
- **Star Rating System** with localStorage persistence
- **Dark Mode Toggle** with theme persistence
- **Responsive Design** with Tailwind CSS
- **Search Filters** by type (movie/series) and year
- **Loading States** and error handling
- **Smooth Animations** with Framer Motion
- **Redux Toolkit** for state management

### 🛠 Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS + Custom Components
- **Animations**: Framer Motion
- **API**: OMDB API
- **Icons**: Lucide React

### 📱 Pages
- **`/movies`** - Movie search with filters and grid
- **`/movies/[id]`** - Detailed movie information
- **`/`** - Redirects to movies page

### 🎨 UI Features
- **Responsive Grid**: 1-5 columns based on screen size
- **Dark/Light Mode**: Persistent theme switching
- **Search Autocomplete**: Debounced suggestions
- **Star Ratings**: Interactive 5-star system
- **Loading States**: Skeleton loading and spinners
- **Error Handling**: User-friendly error messages
- **Smooth Animations**: Page transitions and hover effects

## 🏆 Evaluation Criteria Met

### Backend ✅
- ✅ **Auth Flow**: Secure signup/login with JWT
- ✅ **Password Hashing**: bcrypt with proper salt rounds
- ✅ **Route Protection**: JWT middleware implementation
- ✅ **DB Modeling**: Proper user schema with email indexing
- ✅ **TypeScript Usage**: Comprehensive type safety
- ✅ **Code Structure**: Clean MVC architecture
- ✅ **Error Handling**: Centralized error responses
- ✅ **Code Quality**: Clean, readable, maintainable
- ✅ **Bonus Features**: Role-based auth + password reset

### Frontend ✅
- ✅ **API Integration**: OMDB with proper error handling
- ✅ **Routing**: Smooth navigation between pages
- ✅ **UI/UX**: Responsive, beautiful interface
- ✅ **Component Design**: Reusable, modular components
- ✅ **State Handling**: Redux Toolkit implementation
- ✅ **Search Experience**: Debounced search + autocomplete
- ✅ **Bonus Features**: Filters, animations, dark mode

## 🚀 Deployment Ready

### Backend Deployment
- **Railway**: Connect GitHub repo, add env vars
- **Render**: Set build/start commands, add env vars
- **Heroku**: Use Procfile, configure database

### Frontend Deployment
- **Vercel**: Connect GitHub repo, add OMDB API key
- **Netlify**: Set build command and publish directory
- **Manual**: `npm run build && npm start`

## 📊 Performance Features

### Backend
- **Database Indexing**: Email field indexed for fast lookups
- **Password Security**: 12 salt rounds for optimal security
- **JWT Optimization**: Configurable token expiration
- **Error Handling**: Consistent API responses

### Frontend
- **Image Optimization**: Next.js Image component
- **Search Debouncing**: Reduces API calls (300ms delay)
- **State Caching**: Movie details cached in Redux
- **Lazy Loading**: Components load on demand
- **Local Storage**: Persistent ratings and theme

## 🔧 Environment Variables

### Backend (.env)
```env
DATABASE_URL="mysql://user:pass@host:3306/db"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=5000
EMAIL_HOST="smtp.gmail.com"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
FRONTEND_URL="http://localhost:3000"
```

### Frontend (.env.local)
```env
OMDB_API_KEY="your-omdb-api-key"
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm run dev

# Test endpoints with curl or Postman
curl -X POST http://localhost:5000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"Test123!"}'
```

### Frontend Testing
```bash
cd frontend
npm run dev
npm run type-check
npm run lint
```

## 📈 Future Enhancements

### Backend
- [ ] Rate limiting for API endpoints
- [ ] Refresh token implementation
- [ ] User profile management
- [ ] Email verification
- [ ] OAuth integration (Google, GitHub)

### Frontend
- [ ] Infinite scroll pagination
- [ ] Movie watchlist feature
- [ ] Social sharing
- [ ] Advanced search filters
- [ ] Movie recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OMDB API** for movie data
- **Prisma** for database ORM
- **Next.js** for the React framework
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **Framer Motion** for animations

---

## 🎉 Project Completion Status

### ✅ Assignment 1: Authentication System Backend
- [x] Secure signup/login with JWT
- [x] Password hashing with bcrypt
- [x] Protected routes with middleware
- [x] Input validation with Zod
- [x] Centralized error handling
- [x] Role-based authorization
- [x] Password reset functionality
- [x] TypeScript implementation
- [x] Clean code structure

### ✅ Assignment 2: Movie Search App Frontend
- [x] Movie search with OMDB API
- [x] Movie details page
- [x] Star rating system
- [x] Dark mode toggle
- [x] Responsive design
- [x] Search filters
- [x] Loading/error states
- [x] Smooth animations
- [x] Redux state management

**🎯 Both assignments completed successfully with all requirements met and bonus features implemented!**

---

**Built with ❤️ for the Fullstack Intern Assignment**

**Repository**: [https://github.com/1234-ad/fullstack-intern-assignment](https://github.com/1234-ad/fullstack-intern-assignment)