# Troubleshooting Guide

This guide provides solutions to common issues encountered when working with the webapp project (Python backend + React frontend).

## Table of Contents

- [Environment Setup Issues](#environment-setup-issues)
- [Backend Issues](#backend-issues)
- [Frontend Issues](#frontend-issues)
- [Database Issues](#database-issues)
- [Authentication Issues](#authentication-issues)
- [CORS Issues](#cors-issues)
- [Deployment Issues](#deployment-issues)
- [Performance Issues](#performance-issues)
- [Development Script Issues](#development-script-issues)

## Environment Setup Issues

### Python Environment Problems

**Problem:** `python: command not found`
```bash
# Solution: Install Python from python.org or use a package manager
# Windows: Download from python.org
# macOS: brew install python
# Linux: sudo apt-get install python3
```

**Problem:** `pip: command not found`
```bash
# Solution: Install pip
python -m ensurepip --upgrade
# or
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
```

**Problem:** Virtual environment not working
```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt
```

### Node.js Environment Problems

**Problem:** `node: command not found`
```bash
# Solution: Install Node.js from nodejs.org
# Windows: Download from nodejs.org
# macOS: brew install node
# Linux: sudo apt-get install nodejs npm
```

**Problem:** `npm: command not found`
```bash
# Usually comes with Node.js
# If not, install separately:
# Windows: Download from nodejs.org
# macOS: brew install npm
# Linux: sudo apt-get install npm
```

**Problem:** Package installation fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# If using yarn
yarn cache clean
rm -rf node_modules yarn.lock
yarn install
```

## Backend Issues

### FastAPI Server Won't Start

**Problem:** `ModuleNotFoundError: No module named 'fastapi'`
```bash
# Solution: Install dependencies
cd backend
pip install -r requirements.txt
```

**Problem:** Port 3000 already in use
```bash
# Check what's using the port
# Windows
netstat -ano | findstr :3000

# macOS/Linux
lsof -i :3000

# Kill the process or change port in main.py
```

**Problem:** JWT_SECRET_KEY not set
```bash
# Create .env file in backend directory
cp env.example .env

# Edit .env and set your secret key
JWT_SECRET_KEY=your-secure-secret-key-here
```

### API Endpoint Issues

**Problem:** 404 errors on API endpoints
```bash
# Check if server is running
curl http://localhost:3000/api/health

# Verify endpoint URLs in frontend/api.ts
# Should be: http://localhost:3000/api/endpoint
```

**Problem:** 500 Internal Server Error
```bash
# Check server logs for detailed error
# Common causes:
# - Missing environment variables
# - Database connection issues
# - JWT token problems
```

### Authentication Issues

**Problem:** JWT token expired
```bash
# Token expires after 30 minutes by default
# Re-login to get new token
# Or increase JWT_ACCESS_TOKEN_EXPIRE_MINUTES in main.py
```

**Problem:** Invalid JWT token
```bash
# Check token format in localStorage
# Should be: Bearer <token>
# Clear localStorage and re-login
```

## Frontend Issues

### React Development Server Issues

**Problem:** `npm run dev` fails
```bash
# Install dependencies
cd frontend
npm install

# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problem:** Port 5173 already in use
```bash
# Check what's using the port
# Windows
netstat -ano | findstr :5173

# macOS/Linux
lsof -i :5173

# Kill process or Vite will automatically use next available port
```

**Problem:** TypeScript compilation errors
```bash
# Check TypeScript configuration
# Verify tsconfig.json and tsconfig.app.json
# Run type checking
npm run build
```

### Build Issues

**Problem:** Build fails with TypeScript errors
```bash
# Fix TypeScript errors first
npm run lint

# Check for missing type definitions
npm install @types/node @types/react @types/react-dom
```

**Problem:** Vite build fails
```bash
# Clear dist folder
rm -rf dist

# Rebuild
npm run build

# Check for import/export issues
```

### API Connection Issues

**Problem:** CORS errors in browser console
```bash
# Check CORS configuration in backend/main.py
# Verify frontend URL is in allow_origins
# For development: http://localhost:5173
```

**Problem:** API calls fail with 401
```bash
# Check if token is in localStorage
# Verify token format: Bearer <token>
# Re-login if token is expired
```

**Problem:** API calls fail with 404
```bash
# Verify API_BASE_URL in frontend/src/services/api.ts
# Check if backend is running on correct port
# Verify endpoint URLs
```

## Database Issues

### In-Memory Database Problems

**Problem:** Users disappear after server restart
```bash
# This is expected behavior with in-memory database
# Consider implementing persistent storage:
# - SQLite database
# - PostgreSQL with Supabase
# - MongoDB
```

**Problem:** Database connection fails
```bash
# Check database configuration
# Verify connection strings
# Check if database service is running
```

## Authentication Issues

### Login Problems

**Problem:** Login fails with "Invalid credentials"
```bash
# Check if user exists in database
# Verify password hashing
# Check server logs for detailed error
```

**Problem:** Registration fails
```bash
# Check email format validation
# Verify password requirements
# Check if user already exists
```

### Token Issues

**Problem:** Token not being sent with requests
```bash
# Check localStorage for token
# Verify axios interceptor in api.ts
# Check Authorization header format
```

**Problem:** Token validation fails
```bash
# Check JWT_SECRET_KEY configuration
# Verify token expiration
# Check token format and signature
```

## CORS Issues

### Common CORS Errors

**Problem:** `Access to fetch at 'http://localhost:3000/api/login' from origin 'http://localhost:5173' has been blocked by CORS policy`
```bash
# Check CORS configuration in backend/main.py
# Verify frontend URL is in allow_origins
# For development, add: "http://localhost:5173"
```

**Problem:** CORS preflight fails
```bash
# Check allow_methods includes OPTIONS
# Verify allow_headers includes Authorization
# Check allow_credentials is True
```

### Production CORS Issues

**Problem:** CORS errors in production
```bash
# Update allow_origins with production URLs
# Remove "*" from allow_origins in production
# Add specific domain: "https://your-app.vercel.app"
```

## Deployment Issues

### Vercel Deployment Problems

**Problem:** Build fails on Vercel
```bash
# Check build logs in Vercel dashboard
# Verify vercel.json configuration
# Check for missing environment variables
```

**Problem:** Environment variables not set
```bash
# Set environment variables in Vercel dashboard
# Required variables:
# - JWT_SECRET_KEY
# - SUPABASE_URL (if using Supabase)
# - SUPABASE_ANON_KEY (if using Supabase)
```

**Problem:** API routes not working in production
```bash
# Check vercel.json configuration
# Verify API routes are properly configured
# Check for CORS issues with production domain
```

### Local Production Build Issues

**Problem:** `npm run build` fails
```bash
# Check for TypeScript errors
npm run lint

# Clear cache and rebuild
npm cache clean --force
rm -rf node_modules dist
npm install
npm run build
```

## Performance Issues

### Slow Development Server

**Problem:** Vite dev server is slow
```bash
# Check for large dependencies
# Consider using Vite's optimizeDeps
# Check for unnecessary file watching
```

**Problem:** Backend responses are slow
```bash
# Check for database query optimization
# Verify async/await usage
# Check for blocking operations
```

### Memory Issues

**Problem:** High memory usage
```bash
# Check for memory leaks in React components
# Verify proper cleanup in useEffect
# Check for large bundle sizes
```

## Development Script Issues

### PowerShell Script Problems

**Problem:** `start-dev.ps1` fails to start services
```bash
# Check if PowerShell execution policy allows scripts
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Verify Python and Node.js are in PATH
# Check if ports 3000 and 5173 are available
```

**Problem:** Services don't start automatically
```bash
# Check if Python and Node.js are installed
# Verify dependencies are installed
# Check for port conflicts
```

### Batch Script Problems

**Problem:** `start-dev.bat` doesn't work
```bash
# Check if Python and Node.js are in PATH
# Verify batch file syntax
# Check for Windows-specific issues
```

## Common Error Messages and Solutions

### Backend Errors

**Error:** `ImportError: No module named 'uvicorn'`
```bash
# Solution: Install uvicorn
pip install uvicorn
```

**Error:** `JWT_SECRET_KEY not set`
```bash
# Solution: Set environment variable
export JWT_SECRET_KEY=your-secret-key
# or create .env file
```

**Error:** `Port already in use`
```bash
# Solution: Kill process or change port
# Windows: netstat -ano | findstr :3000
# macOS/Linux: lsof -i :3000
```

### Frontend Errors

**Error:** `Cannot find module 'react'`
```bash
# Solution: Install dependencies
npm install
```

**Error:** `TypeScript compilation failed`
```bash
# Solution: Fix TypeScript errors
npm run lint
```

**Error:** `CORS policy blocked`
```bash
# Solution: Check CORS configuration in backend
# Add frontend URL to allow_origins
```

## Debugging Tips

### Backend Debugging

1. **Enable debug logging:**
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

2. **Check server logs:**
```bash
# Look for error messages in console output
# Check for stack traces
```

3. **Test API endpoints:**
```bash
# Use curl or Postman
curl http://localhost:3000/api/health
```

### Frontend Debugging

1. **Check browser console:**
```bash
# Open Developer Tools (F12)
# Look for JavaScript errors
# Check Network tab for API calls
```

2. **Use React DevTools:**
```bash
# Install React Developer Tools browser extension
# Check component state and props
```

3. **Debug API calls:**
```bash
# Add console.log in api.ts
# Check Network tab in browser
```

## Getting Help

If you're still experiencing issues:

1. **Check the logs:** Look for error messages in console output
2. **Search existing issues:** Check GitHub issues for similar problems
3. **Create a minimal reproduction:** Isolate the problem in a simple test case
4. **Provide context:** Include error messages, environment details, and steps to reproduce

### Useful Commands

```bash
# Check Python version
python --version

# Check Node.js version
node --version

# Check npm version
npm --version

# List installed packages (Python)
pip list

# List installed packages (Node.js)
npm list

# Check if ports are in use
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # macOS/Linux
```

### Environment Checklist

- [ ] Python 3.8+ installed
- [ ] Node.js 16+ installed
- [ ] npm or yarn installed
- [ ] Virtual environment created (optional but recommended)
- [ ] Backend dependencies installed (`pip install -r requirements.txt`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Environment variables configured
- [ ] Ports 3000 and 5173 available
- [ ] CORS properly configured
- [ ] JWT secret key set

---

**Last updated:** December 2024  
**Project version:** 1.0.0 