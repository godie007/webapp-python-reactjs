# API Documentation

This document provides comprehensive documentation for the webapp API endpoints, authentication, and data models.

## Table of Contents

- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Data Models](#data-models)
- [Endpoints](#endpoints)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [Testing](#testing)

## Overview

The webapp API is built with **FastAPI** and provides authentication and user management functionality. The API uses JWT (JSON Web Tokens) for authentication and supports CORS for cross-origin requests.

### **Application Interface**

#### **Main Application**
![Home Page Interface](images/homePage.png)

#### **Authentication Interface**
![Login Form](images/login.png)
![Registration Form](images/register.png)

### Features

- ✅ JWT-based authentication
- ✅ User registration and login
- ✅ Protected endpoints
- ✅ CORS support
- ✅ Health check endpoint
- ✅ Automatic API documentation (Swagger UI)

### Technology Stack

- **Framework:** FastAPI
- **Authentication:** JWT (PyJWT)
- **CORS:** FastAPI CORS Middleware
- **Validation:** Pydantic models
- **Server:** Uvicorn

## Base URL

### Development
```
http://localhost:3000
```

### Production
```
https://your-app.vercel.app
```

### API Documentation
```
http://localhost:3000/docs  # Swagger UI
http://localhost:3000/redoc # ReDoc
```

## Authentication

The API uses **JWT (JSON Web Tokens)** for authentication. All protected endpoints require a valid JWT token in the Authorization header.

### Token Format
```
Authorization: Bearer <jwt_token>
```

### Token Configuration
- **Algorithm:** HS256
- **Expiration:** 30 minutes (configurable)
- **Secret Key:** Set via `JWT_SECRET_KEY` environment variable

### Getting a Token

1. **Register** a new user to get an access token
2. **Login** with existing credentials to get an access token
3. **Include** the token in subsequent requests

## Data Models

### Request Models

#### LoginRequest
```typescript
{
  email: string;      // User's email address
  password: string;   // User's password
}
```

#### RegisterRequest
```typescript
{
  email: string;      // User's email address (validated)
  password: string;   // User's password
  username: string;   // User's display name
}
```

### Response Models

#### LoginResponse
```typescript
{
  access_token: string;  // JWT token for authentication
  token_type: string;    // Always "bearer"
  user: User;           // User information
}
```

#### RegisterResponse
```typescript
{
  access_token: string;  // JWT token for authentication
  token_type: string;    // Always "bearer"
  user: User;           // User information
  message: string;      // Success message
}
```

#### ProtectedResponse
```typescript
{
  message: string;      // Personalized message
  user_info: User;     // Current user information
}
```

#### User
```typescript
{
  id: string;           // User ID
  username: string;     // Display name
  email: string;        // Email address
  is_active: boolean;   // Account status
}
```

#### HealthResponse
```typescript
{
  status: string;       // "ok"
  message: string;      // Status message
  auth_mode: string;    // "JWT"
  debug: {
    users_registered: number;
    framework: string;
    jwt_algorithm: string;
    jwt_expire_minutes: number;
  }
}
```

## Endpoints

### Public Endpoints

#### 1. Root Endpoint
```
GET /
```

**Description:** API information and documentation links

**Response:**
```json
{
  "message": "API de Autenticación con JWT",
  "version": "1.0.0",
  "documentation": "/docs"
}
```

#### 2. Health Check
```
GET /api/health
```

**Description:** Check API status and configuration

**Response:**
```json
{
  "status": "ok",
  "message": "API funcionando correctamente con JWT",
  "auth_mode": "JWT",
  "debug": {
    "users_registered": 0,
    "framework": "fastapi",
    "jwt_algorithm": "HS256",
    "jwt_expire_minutes": 30
  }
}
```

#### 3. Test Endpoint
```
GET /api/test
```

**Description:** Simple test endpoint

**Response:**
```json
{
  "message": "Endpoint de prueba funcionando"
}
```

### Authentication Endpoints

#### 4. User Registration
```
POST /api/register
```

**Description:** Register a new user account

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "username": "johndoe"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "username": "johndoe",
    "is_active": true
  },
  "message": "Usuario registrado exitosamente"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid email format
- `409 Conflict` - User already exists

#### 5. User Login
```
POST /api/login
```

**Description:** Authenticate existing user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "username": "johndoe",
    "is_active": true
  }
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid credentials

### Protected Endpoints

All protected endpoints require a valid JWT token in the Authorization header.

#### 6. Protected Data
```
GET /api/protected
```

**Description:** Get personalized protected data

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Hola johndoe, has accedido a datos protegidos",
  "user_info": {
    "id": "123",
    "username": "johndoe",
    "email": "user@example.com",
    "is_active": true
  }
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid or missing token
- `403 Forbidden` - Token expired

#### 7. Get Users
```
GET /api/users
```

**Description:** Get list of users (currently returns current user only)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "users": [
    {
      "id": "123",
      "username": "johndoe",
      "email": "user@example.com",
      "is_active": true
    }
  ]
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid or missing token
- `500 Internal Server Error` - Server error

## Error Handling

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Invalid or missing authentication |
| 403 | Forbidden - Valid token but insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation error |
| 500 | Internal Server Error - Server error |

### Error Response Format

```json
{
  "detail": "Error message description"
}
```

### Common Error Messages

- `"Credenciales inválidas"` - Invalid login credentials
- `"Token inválido o expirado"` - Invalid or expired JWT token
- `"Usuario ya existe"` - User already registered
- `"Email inválido"` - Invalid email format

## Examples

### Complete Authentication Flow

#### 1. Register a new user
```bash
curl -X POST "http://localhost:3000/api/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "mypassword123",
    "username": "john_doe"
  }'
```

#### 2. Login with credentials
```bash
curl -X POST "http://localhost:3000/api/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "mypassword123"
  }'
```

#### 3. Access protected endpoint
```bash
curl -X GET "http://localhost:3000/api/protected" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### JavaScript/TypeScript Examples

#### Using Fetch API
```javascript
// Register
const registerUser = async (userData) => {
  const response = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// Login
const loginUser = async (credentials) => {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials)
  });
  return response.json();
};

// Access protected endpoint
const getProtectedData = async (token) => {
  const response = await fetch('http://localhost:3000/api/protected', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};
```

#### Using Axios
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Register
const register = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

// Login
const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

// Get protected data
const getProtectedData = async () => {
  const response = await api.get('/protected');
  return response.data;
};
```

## Testing

### Manual Testing

1. **Start the server:**
```bash
cd backend
python main.py
```

2. **Access Swagger UI:**
```
http://localhost:3000/docs
```

3. **Test endpoints using Swagger UI or curl**

### Automated Testing

#### Using curl
```bash
# Health check
curl http://localhost:3000/api/health

# Register
curl -X POST "http://localhost:3000/api/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","username":"testuser"}'

# Login
curl -X POST "http://localhost:3000/api/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Protected endpoint (replace TOKEN with actual token)
curl -X GET "http://localhost:3000/api/protected" \
  -H "Authorization: Bearer TOKEN"
```

#### Using Postman

1. Import the collection
2. Set environment variables
3. Run the requests in sequence

### Test Credentials

For development testing, you can use these hardcoded credentials:

```json
{
  "email": "diegof.e3@gmail.com",
  "password": "123456789"
}
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_SECRET_KEY` | Secret key for JWT tokens | `"your-secret-key-change-in-production"` |
| `JWT_ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time | `30` |
| `HOST` | Server host | `"0.0.0.0"` |
| `PORT` | Server port | `3000` |

### CORS Configuration

The API is configured to allow requests from:

- `http://localhost:5173` (Vite dev server)
- `http://127.0.0.1:5173` (Vite dev server alternative)
- `http://localhost:3000` (Backend)
- `http://127.0.0.1:3000` (Backend alternative)
- `https://*.vercel.app` (Vercel)
- `https://vercel.app` (Vercel)

**Note:** `"*"` is included for development but should be removed in production.

## Security Considerations

### JWT Security
- Use a strong, unique `JWT_SECRET_KEY`
- Set appropriate token expiration times
- Validate tokens on every protected request
- Store tokens securely (localStorage for SPA, httpOnly cookies for better security)

### CORS Security
- Configure specific origins in production
- Remove wildcard `"*"` in production
- Use HTTPS in production

### Input Validation
- All inputs are validated using Pydantic models
- Email addresses are validated for correct format
- Passwords should meet security requirements (implement in production)

## Rate Limiting

Currently, the API does not implement rate limiting. For production, consider implementing:

- Rate limiting per IP address
- Rate limiting per user account
- Different limits for different endpoints

## Monitoring and Logging

### Health Check
Use the `/api/health` endpoint to monitor API status.

### Logging
The API includes debug logging for authentication requests. Enable detailed logging for troubleshooting.

## Future Enhancements

- [ ] Password hashing with bcrypt
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Role-based access control
- [ ] Rate limiting
- [ ] API versioning
- [ ] Database integration (PostgreSQL, MongoDB)
- [ ] File upload functionality
- [ ] Real-time notifications

---

**API Version:** 1.0.0  
**Last Updated:** December 2024  
**Framework:** FastAPI  
**Authentication:** JWT 