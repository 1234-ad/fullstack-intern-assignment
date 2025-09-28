# Authentication System Backend

A secure authentication system built with Node.js, Express, TypeScript, and MySQL.

## 🚀 Features

- ✅ **Secure Signup/Login** with JWT authentication
- ✅ **Password Hashing** using bcrypt with salt rounds
- ✅ **Protected Routes** with JWT middleware
- ✅ **Input Validation** using Zod schemas
- ✅ **Centralized Error Handling** with consistent responses
- ✅ **Role-based Authorization** (USER/ADMIN)
- ✅ **Password Reset** functionality with email
- ✅ **TypeScript** for type safety
- ✅ **Prisma ORM** for database operations

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Password Hashing**: bcrypt
- **Validation**: Zod
- **Email**: Nodemailer

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repo-url>
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
```

4. **Configure your .env file**
```env
DATABASE_URL="mysql://username:password@localhost:3306/auth_db"
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_FROM="noreply@yourapp.com"
FRONTEND_URL="http://localhost:3000"
```

5. **Database Setup**
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations (recommended for production)
npm run db:migrate
```

6. **Start the server**
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## 📚 API Endpoints

### Public Routes

#### POST /auth/signup
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### POST /auth/login
Login with existing credentials
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### POST /auth/reset-password
Request password reset
```json
{
  "email": "john@example.com"
}
```

#### POST /auth/confirm-reset
Confirm password reset with token
```json
{
  "token": "reset-token-here",
  "newPassword": "NewSecurePass123!"
}
```

### Protected Routes

#### GET /auth/me
Get current user profile (requires JWT token)
```bash
Authorization: Bearer <jwt-token>
```

#### GET /auth/admin-only
Admin-only endpoint example
```bash
Authorization: Bearer <admin-jwt-token>
```

## 🔒 Security Features

- **Password Requirements**: Minimum 8 characters with uppercase, lowercase, number, and special character
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcrypt with 12 salt rounds
- **Input Validation**: Comprehensive validation using Zod
- **CORS Protection**: Configured for frontend integration
- **Helmet**: Security headers middleware
- **Rate Limiting**: Can be added for production

## 🏗 Project Structure

```
src/
├── controllers/        # Request handlers
├── middleware/         # Custom middleware
├── routes/            # API routes
├── lib/               # Utility functions
├── types/             # TypeScript types
├── validation/        # Zod schemas
└── index.ts           # Server entry point
```

## 🧪 Testing

Test the API using tools like Postman, Insomnia, or curl:

```bash
# Health check
curl http://localhost:5000/health

# Signup
curl -X POST http://localhost:5000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"TestPass123!"}'

# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPass123!"}'

# Get profile (replace TOKEN with actual JWT)
curl http://localhost:5000/auth/me \
  -H "Authorization: Bearer TOKEN"
```

## 🚀 Deployment

### Railway
1. Connect your GitHub repo to Railway
2. Add environment variables
3. Deploy automatically

### Render
1. Connect your GitHub repo to Render
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL connection string | `mysql://user:pass@host:3306/db` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key` |
| `JWT_EXPIRES_IN` | Token expiration time | `7d` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `EMAIL_HOST` | SMTP host | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port | `587` |
| `EMAIL_USER` | SMTP username | `your-email@gmail.com` |
| `EMAIL_PASS` | SMTP password | `your-app-password` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details