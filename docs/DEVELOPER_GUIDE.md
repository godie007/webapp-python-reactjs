# 📖 Development Guide - WebApp Python

> **Complete guide for developers who want to contribute or extend the template**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)

## 📋 Table of Contents

- [🎯 Introduction](#-introduction)
- [🛠️ Environment Setup](#️-environment-setup)
- [🏗️ Code Architecture](#️-code-architecture)
- [🎨 Frontend Development](#-frontend-development)
- [🔧 Backend Development](#-backend-development)
- [📊 Database](#-database)
- [🧪 Testing](#-testing)
- [🔍 Debugging](#-debugging)
- [📦 Build and Deploy](#-build-and-deploy)
- [🤝 Contribution](#-contribution)

## 🎯 Introduction

This guide is designed for developers who want to understand, extend, or contribute to the **WebApp Python** template. It covers all aspects of development, from initial setup to production deployment.

### 🎯 Guide Objectives

- ✅ **Understand the architecture** of the project
- ✅ **Set up the development** environment
- ✅ **Develop new features** following best practices
- ✅ **Maintain code quality**
- ✅ **Contribute effectively** to the project

## 🛠️ Environment Setup

### **System Prerequisites**

#### **Required Software**
```bash
# Node.js (LTS version)
node --version  # >= 18.0.0

# Python (version 3.9+)
python --version  # >= 3.9.0

# Git
git --version  # >= 2.30.0

# npm or yarn
npm --version  # >= 8.0.0
```

#### **Recommended Tools**
- **VS Code** with extensions:
  - TypeScript and JavaScript Language Features
  - Python
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier
  - Auto Rename Tag
  - Bracket Pair Colorizer

### **Initial Setup**

#### **1. Clone and Configure**
```bash
# Clone the repository
git clone https://github.com/your-username/webapp-python.git
cd webapp-python

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt
```

#### **2. Environment Variables**
```bash
# Backend
cp backend/env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

#### **3. Configure Database**
```bash
# Create local database (optional)
createdb webapp_python_dev

# Or use Supabase
# 1. Create project in Supabase
# 2. Get DATABASE_URL
# 3. Configure in backend/.env
```

### **Development Scripts**

#### **Quick Start**
```bash
# Start both frontend and backend
./start-dev.ps1  # Windows PowerShell
./start-dev.bat  # Windows Command Prompt
```

#### **Manual Start**
```bash
# Terminal 1 - Backend
cd backend
python main.py

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🏗️ Code Architecture

### **Project Structure**
```
webapp-python/
├── frontend/                 # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # FastAPI + Python
│   ├── app/
│   │   ├── models/         # Pydantic models
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utilities
│   ├── main.py            # FastAPI application
│   └── requirements.txt
├── docs/                   # Documentation
└── vercel.json            # Vercel configuration
```

### **Technology Stack**

#### **Frontend**
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications

#### **Backend**
- **FastAPI** - Web framework
- **Python 3.9+** - Programming language
- **Pydantic** - Data validation
- **PyJWT** - JWT authentication
- **Uvicorn** - ASGI server
- **Supabase** - Database (optional)

## 🎨 Frontend Development

### **Component Structure**

#### **Component Guidelines**
```typescript
// ✅ Good component structure
interface ComponentProps {
  title: string;
  onAction: () => void;
}

export const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  return (
    <div className="component">
      <h1>{title}</h1>
      <button onClick={onAction}>Action</button>
    </div>
  );
};
```

#### **State Management**
```typescript
// Use React hooks for local state
const [data, setData] = useState<DataType[]>([]);
const [loading, setLoading] = useState(false);

// Use context for global state
const AuthContext = createContext<AuthContextType | null>(null);
```

### **Styling Guidelines**

#### **Tailwind CSS Classes**
```typescript
// ✅ Consistent class ordering
<div className="
  flex items-center justify-between
  p-4 bg-white rounded-lg shadow-md
  hover:shadow-lg transition-shadow
  dark:bg-gray-800 dark:text-white
">
```

#### **Responsive Design**
```typescript
// Mobile-first approach
<div className="
  w-full md:w-1/2 lg:w-1/3
  p-2 md:p-4 lg:p-6
">
```

### **API Integration**

#### **Service Layer**
```typescript
// services/api.ts
export const apiService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post('/login', credentials);
    return response.data;
  },
  
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post('/register', userData);
    return response.data;
  }
};
```

#### **Error Handling**
```typescript
// Handle API errors consistently
try {
  const data = await apiService.login(credentials);
  // Handle success
} catch (error) {
  if (error.response?.status === 401) {
    // Handle unauthorized
  } else {
    // Handle other errors
  }
}
```

## 🔧 Backend Development

### **FastAPI Structure**

#### **Main Application**
```python
# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="WebApp API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### **Model Definitions**
```python
# models/user.py
from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    is_active: bool
```

### **Authentication System**

#### **JWT Implementation**
```python
# utils/auth.py
import jwt
from datetime import datetime, timedelta

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

#### **Protected Routes**
```python
# dependencies.py
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer

security = HTTPBearer()

async def get_current_user(token: str = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = verify_token(token.credentials)
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    return {"user_id": user_id}
```

### **Database Integration**

#### **Supabase Setup**
```python
# database.py
from supabase import create_client, Client

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# User operations
def create_user(user_data: dict):
    return supabase.table("users").insert(user_data).execute()

def get_user_by_email(email: str):
    return supabase.table("users").select("*").eq("email", email).execute()
```

## 📊 Database

### **Schema Design**

#### **Users Table**
```sql
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### **Sessions Table**
```sql
CREATE TABLE sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### **Migrations**

#### **Using Supabase**
```bash
# Apply migrations through Supabase dashboard
# Or use Supabase CLI
supabase db push
```

## 🧪 Testing

### **Frontend Testing**

#### **Unit Tests**
```typescript
// components/__tests__/LoginForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from '../LoginForm';

describe('LoginForm', () => {
  test('renders login form', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('submits form with correct data', async () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

#### **Integration Tests**
```typescript
// services/__tests__/api.test.ts
import { apiService } from '../api';

describe('API Service', () => {
  test('login returns user data', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    const result = await apiService.login(credentials);
    expect(result).toHaveProperty('access_token');
    expect(result).toHaveProperty('user');
  });
});
```

### **Backend Testing**

#### **Unit Tests**
```python
# test_auth.py
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_login_success():
    response = client.post("/api/login", json={
        "email": "test@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_invalid_credentials():
    response = client.post("/api/login", json={
        "email": "test@example.com",
        "password": "wrongpassword"
    })
    assert response.status_code == 401
```

#### **Integration Tests**
```python
# test_api_integration.py
def test_full_auth_flow():
    # 1. Register user
    register_response = client.post("/api/register", json={
        "email": "newuser@example.com",
        "password": "password123",
        "username": "newuser"
    })
    assert register_response.status_code == 200
    
    # 2. Login
    login_response = client.post("/api/login", json={
        "email": "newuser@example.com",
        "password": "password123"
    })
    assert login_response.status_code == 200
    
    # 3. Access protected endpoint
    token = login_response.json()["access_token"]
    protected_response = client.get(
        "/api/protected",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert protected_response.status_code == 200
```

## 🔍 Debugging

### **Frontend Debugging**

#### **React DevTools**
```bash
# Install React Developer Tools browser extension
# Use Components tab to inspect component tree
# Use Profiler tab to analyze performance
```

#### **Console Debugging**
```typescript
// Add debug logs
console.log('Component rendered with props:', props);
console.log('API response:', response.data);

// Use debugger statement
debugger; // Browser will pause here
```

### **Backend Debugging**

#### **FastAPI Debug Mode**
```python
# Enable debug mode
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=3000, reload=True)
```

#### **Logging**
```python
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Use in code
logger.debug("Processing request")
logger.info("User logged in successfully")
logger.error("Database connection failed")
```

### **API Testing**

#### **Swagger UI**
```bash
# Access interactive API documentation
http://localhost:3000/docs
```

#### **Postman Collection**
```json
{
  "info": {
    "name": "WebApp Python API",
    "description": "API collection for testing"
  },
  "item": [
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/api/login",
        "body": {
          "mode": "raw",
          "raw": "{\"email\":\"test@example.com\",\"password\":\"password123\"}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        }
      }
    }
  ]
}
```

## 📦 Build and Deploy

### **Frontend Build**

#### **Production Build**
```bash
# Build for production
cd frontend
npm run build

# Preview build
npm run preview
```

#### **Build Optimization**
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['axios', 'react-hook-form']
        }
      }
    }
  }
});
```

### **Backend Deployment**

#### **Vercel Configuration**
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/main.py"
    }
  ]
}
```

#### **Environment Variables**
```bash
# Production environment variables
JWT_SECRET_KEY=your-super-secure-production-secret
DATABASE_URL=postgresql://user:password@host:port/database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
```

## 🤝 Contribution

### **Development Workflow**

#### **1. Fork and Clone**
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/your-username/webapp-python.git
cd webapp-python

# Add upstream remote
git remote add upstream https://github.com/original-owner/webapp-python.git
```

#### **2. Create Feature Branch**
```bash
# Create and switch to feature branch
git checkout -b feature/your-feature-name

# Make your changes
# Test thoroughly
# Commit with descriptive message
git commit -m "feat: add user profile management"
```

#### **3. Submit Pull Request**
```bash
# Push to your fork
git push origin feature/your-feature-name

# Create PR on GitHub
# Fill out PR template
# Request review
```

### **Code Standards**

#### **TypeScript/JavaScript**
```typescript
// Use TypeScript for type safety
interface User {
  id: string;
  email: string;
  username: string;
}

// Use async/await for promises
async function fetchUser(id: string): Promise<User> {
  const response = await api.get(`/users/${id}`);
  return response.data;
}

// Use meaningful variable names
const userProfile = await getUserProfile(userId);
const isAuthenticated = Boolean(accessToken);
```

#### **Python**
```python
# Use type hints
def create_user(user_data: UserCreate) -> UserResponse:
    """Create a new user in the database."""
    user = User(**user_data.dict())
    db.add(user)
    db.commit()
    return UserResponse.from_orm(user)

# Use docstrings
def authenticate_user(email: str, password: str) -> Optional[User]:
    """
    Authenticate user with email and password.
    
    Args:
        email: User's email address
        password: User's password
        
    Returns:
        User object if authentication successful, None otherwise
    """
    user = get_user_by_email(email)
    if user and verify_password(password, user.password_hash):
        return user
    return None
```

### **Commit Message Convention**

```bash
# Format: type(scope): description

# Examples:
feat(auth): add JWT token refresh functionality
fix(api): resolve CORS issue with frontend
docs(readme): update installation instructions
style(components): improve button styling
refactor(services): extract API client to separate module
test(auth): add unit tests for login validation
chore(deps): update dependencies to latest versions
```

### **Review Process**

#### **Before Submitting PR**
- [ ] Code follows project standards
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No console errors
- [ ] Responsive design tested
- [ ] API endpoints tested

#### **PR Checklist**
- [ ] Clear description of changes
- [ ] Screenshots (if UI changes)
- [ ] Test cases included
- [ ] Breaking changes documented
- [ ] Migration guide (if needed)

---

**Last Updated:** December 2024  
**Version:** 1.0.0  
**Maintainer:** Development Team 