# 🚀 Quick Start Guide - FreshCart Authentication

## **5-Minute Setup**

### **Step 1: Install Dependencies**

```bash
cd d:\freshcart
npm install
```

### **Step 2: Start Backend Server** (Terminal 1)

```bash
npm run server
# Server running on http://localhost:5000
```

### **Step 3: Start Frontend** (Terminal 2)

```bash
npm run dev
# Frontend running on http://localhost:3000
```

### **Step 4: Test the App**

#### **Register a New Account**

1. Go to http://localhost:3000/register
2. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Phone: 9876543210
   - Password: Test@1234 (min 8 chars)
3. Click "Create Account"
4. You'll be redirected to login

#### **Login**

1. Go to http://localhost:3000/login (or back from register)
2. Enter email and password
3. Click "Sign In"
4. You'll see **User Dashboard** 🎉

#### **Test Admin Dashboard** (Optional)

To test admin dashboard:

1. Register with admin user (need to set role='admin' in database)
2. Login with admin account
3. See admin-specific dashboard

---

## **Page Routes**

| Page            | URL                | Protected | Role     |
| --------------- | ------------------ | --------- | -------- |
| Register        | `/register`        | ❌ No     | Any      |
| Login           | `/login`           | ❌ No     | Any      |
| User Dashboard  | `/user/dashboard`  | ✅ Yes    | customer |
| Admin Dashboard | `/admin/dashboard` | ✅ Yes    | admin    |

---

## **API Endpoints**

### **Register**

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "Test@1234"
}
```

### **Login**

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Test@1234"
}
```

### **Logout**

```bash
POST http://localhost:5000/api/auth/logout
```

### **Get Current User**

```bash
GET http://localhost:5000/api/auth/me
(Requires valid token in cookie)
```

---

## **Key Features**

✅ **Registration**

- Email validation
- Phone validation
- Password strength (8+ characters)
- Automatic login redirect

✅ **Login**

- JWT authentication
- Secure HTTP-only cookies
- Role-based redirect (admin/customer)
- Session persistence

✅ **User Dashboard**

- Account information
- Order history with status
- Quick action buttons
- Loyalty points tracking

✅ **Admin Dashboard**

- Business metrics
- User management
- Product management
- Order management
- System settings
- Activity feed

✅ **Security**

- BCrypt password hashing
- JWT tokens (7-day expiration)
- HTTP-only cookies
- CSRF protection
- Protected routes

---

## **Troubleshooting**

### **Port Already in Use**

```bash
# Change PORT in .env
PORT=5001  # or any available port
```

### **Database Connection Error**

```bash
# Check DATABASE_URL in .env
# Verify PostgreSQL/Neon is running
npm run dz:push  # Run migrations
```

### **Clear User Data**

```bash
# Open browser DevTools (F12)
# Go to Storage > Local Storage
# Delete 'token' and 'user' items
# Then logout
```

---

## **File Locations**

```
src/
├── app/login/page.tsx              # Login page
├── app/register/page.tsx           # Registration page
├── app/user/dashboard/page.tsx     # User dashboard
├── app/admin/dashboard/page.tsx    # Admin dashboard
├── backend/
│   ├── controllers/authControllers.ts
│   ├── services/authService.ts
│   └── routes/authRoutes.ts
└── server.ts                       # Express backend
```

---

## **Environment Variables**

```env
# .env file
NODE_ENV=development
PORT=5000
DATABASE_URL=<your-neon-postgres-url>
LOCAL_HOST=http://localhost:3000
JWT_SECRET=your-super-secret-key
TEST_MODE=true
```

---

## **Build & Deploy**

```bash
# Build for production
npm run build

# Run production build
npm start

# Run TypeScript type checking
npx tsc --noEmit

# Run linter
npm run lint
```

---

## **What's Next?**

1. ✅ Authentication implemented
2. ✅ User dashboard created
3. ✅ Admin dashboard created
4. ⏭️ Add products page
5. ⏭️ Create shopping cart
6. ⏭️ Implement checkout
7. ⏭️ Add payment integration
8. ⏭️ Email verification
9. ⏭️ Password reset flow

---

**Everything is ready to use! 🎉**

Start the servers and test it out!
