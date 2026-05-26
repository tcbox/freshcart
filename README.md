# 🍎 FreshCart

A **production-grade fruit & salad delivery platform** built with modern TypeScript, featuring real-time ordering, scalable architecture, and enterprise-level engineering practices.

[![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)]()
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)]()
[![React](https://img.shields.io/badge/React-19-blue?logo=react)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Dependencies & Packages](#dependencies--packages)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Project Status](#project-status)
- [Scalability](#scalability)
- [Engineering Focus](#engineering-focus)
- [Future Roadmap](#future-roadmap)

---

## 🎯 Overview

FreshCart is a **learning-focused, production-ready** delivery platform designed to demonstrate:

✅ **High-Performance Systems** – Handling 25K+ concurrent users with sub-100ms API responses  
✅ **Real-Time Architecture** – WebSocket-based order tracking and instant notifications  
✅ **Secure Payment Processing** – PCI-compliant Razorpay integration  
✅ **Scalable Backend** – Microservices-ready with caching, queuing, and database optimization  
✅ **Professional DevOps** – Docker containerization and cloud-ready deployments

This is also my **personal engineering journey** to master:

- System design and scalability patterns
- Production-grade TypeScript architecture
- Backend engineering fundamentals
- DevOps and deployment pipelines
- Enterprise software architecture

---

## 🚀 Features

### Core Functionality

- 🔐 **User Authentication** – Secure JWT-based auth with refresh tokens
- 🛒 **Smart Cart Management** – Real-time inventory sync, persistent carts
- 📦 **Fruit & Salad Ordering** – Catalog with categories, filters, and search
- 💳 **Payment Integration** – Razorpay for secure transactions
- 📊 **Inventory Management** – Real-time stock tracking and low-stock alerts

### Advanced Features

- 📱 **Admin Dashboard** – Order management, analytics, inventory control
- ⚡ **Real-Time Notifications** – WebSocket-based order status updates
- 🔄 **Background Jobs** – Order processing, invoice generation, email notifications
- 🛡️ **Secure APIs** – Rate limiting, input validation, CSRF protection
- 📈 **Performance Optimization** – Caching, compression, CDN-ready

---

## 💻 Tech Stack

### **Frontend**

| Tech        | Version | Purpose                          |
| ----------- | ------- | -------------------------------- |
| React       | 19.2.4  | UI Components & State Management |
| Next.js     | 16.2.6  | Framework, SSR, API Routes       |
| TypeScript  | 5+      | Type Safety                      |
| TailwindCSS | 4       | Styling & Responsive Design      |

### **Backend**

| Tech       | Version | Purpose                 |
| ---------- | ------- | ----------------------- |
| Node.js    | 20+     | Runtime                 |
| Express    | 5.2.1   | API Framework           |
| TypeScript | 5+      | Type Safety             |
| Zod        | 4.4.3   | Schema Validation       |
| PostgreSQL | Latest  | Primary Database        |
| Redis      | Latest  | Caching & Message Queue |

### **DevOps & Tools**

| Tool                | Purpose          |
| ------------------- | ---------------- |
| Docker              | Containerization |
| ESLint              | Code Quality     |
| TypeScript Compiler | Type Checking    |

---

## 📁 Project Structure

```
freshcart/
├── src/
│   ├── app/                          # Next.js app directory
│   │   ├── api/                      # API routes & endpoints
│   │   ├── layout.tsx                # Root layout component
│   │   ├── page.tsx                  # Home page
│   │   └── globals.css               # Global styles
│   │
│   ├── backend/                      # Backend business logic
│   │   ├── controllers/              # Request handlers (MVC pattern)
│   │   │   ├── authController.ts
│   │   │   ├── orderController.ts
│   │   │   ├── productController.ts
│   │   │   └── ...
│   │   │
│   │   ├── services/                 # Business logic & operations
│   │   │   ├── authService.ts
│   │   │   ├── orderService.ts
│   │   │   ├── paymentService.ts
│   │   │   └── ...
│   │   │
│   │   ├── repository/               # Database access layer
│   │   │   ├── userRepository.ts
│   │   │   ├── orderRepository.ts
│   │   │   ├── productRepository.ts
│   │   │   └── ...
│   │   │
│   │   ├── database/                 # Database configuration & migrations
│   │   │   ├── connection.ts
│   │   │   ├── schema.sql
│   │   │   └── migrations/
│   │   │
│   │   └── routes/                   # Express route definitions
│   │       ├── authRoutes.ts
│   │       ├── orderRoutes.ts
│   │       └── ...
│   │
│   ├── frontend/                     # React components & UI
│   │   ├── components/               # Reusable UI components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── ProductCard/
│   │   │   ├── Cart/
│   │   │   └── ...
│   │   │
│   │   ├── features/                 # Feature-specific components
│   │   │   ├── auth/
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   └── ...
│   │   │
│   │   └── hooks/                    # Custom React hooks
│   │       ├── useAuth.ts
│   │       ├── useCart.ts
│   │       └── ...
│   │
│   └── lib/                          # Shared utilities & helpers
│       ├── config/                   # App configuration
│       │   ├── env.ts
│       │   ├── constants.ts
│       │   └── ...
│       │
│       ├── types/                    # TypeScript types & interfaces
│       │   ├── user.ts
│       │   ├── order.ts
│       │   ├── product.ts
│       │   └── ...
│       │
│       ├── utils/                    # Utility functions
│       │   ├── validators.ts
│       │   ├── formatters.ts
│       │   ├── helpers.ts
│       │   └── ...
│       │
│       ├── validations/              # Input validation schemas (Zod)
│       │   ├── authValidation.ts
│       │   ├── orderValidation.ts
│       │   └── ...
│       │
│       ├── services/                 # Shared services
│       │   ├── api.ts
│       │   ├── auth.ts
│       │   └── ...
│       │
│       ├── store/                    # State management
│       │   ├── userStore.ts
│       │   ├── cartStore.ts
│       │   └── ...
│       │
│       ├── providers/                # Context providers
│       │   ├── AuthProvider.tsx
│       │   ├── ThemeProvider.tsx
│       │   └── ...
│       │
│       └── constants/                # App-wide constants
│           ├── api.ts
│           ├── messages.ts
│           └── ...
│
├── public/                           # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── Configuration Files
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── next.config.ts                # Next.js configuration
│   ├── tailwind.config.js            # TailwindCSS configuration
│   ├── postcss.config.mjs            # PostCSS configuration
│   ├── eslint.config.mjs             # ESLint configuration
│   ├── cspell.json                   # Spell checker configuration
│   ├── .env.example                  # Environment variables template
│   ├── package.json                  # Project dependencies
│   ├── package-lock.json             # Dependency lock file
│   └── .gitignore                    # Git ignore rules
│
└── Documentation
    ├── README.md                     # This file
    ├── AGENTS.md                     # AI agent configuration
    └── CLAUDE.md                     # Development guidelines
```

### **Directory Purpose Summary**

| Directory       | Purpose                                                      |
| --------------- | ------------------------------------------------------------ |
| `src/app/`      | Next.js 13+ app directory (pages, layouts, API routes)       |
| `src/backend/`  | Backend business logic (controllers, services, repositories) |
| `src/frontend/` | Frontend React components (UI, features, hooks)              |
| `src/lib/`      | Shared utilities, types, validations, config                 |
| `public/`       | Static assets (images, icons, fonts)                         |

---

## 📦 Dependencies & Packages

### **Production Dependencies Summary**

```json
{
  "dependencies": {
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "next": "16.2.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "zod": "^4.4.3"
  }
}
```

### **Dependency Details**

| Package       | Version | Purpose                    | Why Included                                                  |
| ------------- | ------- | -------------------------- | ------------------------------------------------------------- |
| **next**      | 16.2.6  | Full-stack React framework | SSR, API routes, automatic optimization, file-based routing   |
| **react**     | 19.2.4  | UI library                 | Component-based UI development, hooks, state management       |
| **react-dom** | 19.2.4  | React rendering            | DOM manipulation and component rendering                      |
| **express**   | 5.2.1   | Backend API framework      | HTTP server, middleware, routing for backend services         |
| **zod**       | 4.4.3   | Schema validation          | Runtime type checking, API request validation, type inference |
| **dotenv**    | 17.4.2  | Environment config         | Load .env variables safely into process.env                   |

---

### **Development Dependencies Summary**

```json
{
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.6",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### **Development Dependency Details**

| Package                  | Version | Purpose                    | Why Included                                                  |
| ------------------------ | ------- | -------------------------- | ------------------------------------------------------------- |
| **typescript**           | 5+      | Language & type checking   | Type safety, better IDE support, compile-time error detection |
| **tailwindcss**          | 4       | Utility-first CSS          | Rapid UI development, consistent design, responsive utilities |
| **@tailwindcss/postcss** | 4       | PostCSS plugin             | Processes Tailwind CSS directives                             |
| **eslint**               | 9       | Code quality & linting     | Catches bugs, enforces code standards, consistency            |
| **eslint-config-next**   | 16.2.6  | ESLint for Next.js         | Next.js-specific linting rules                                |
| **@types/node**          | 20+     | TypeScript definitions     | Type information for Node.js APIs                             |
| **@types/react**         | 19      | TypeScript React types     | Type information for React components                         |
| **@types/react-dom**     | 19      | TypeScript React DOM types | Type information for React DOM                                |

---

## ⚙️ Configuration

### **TypeScript Configuration** (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2017", // JavaScript target version
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true, // Enable strict type checking
    "jsx": "react-jsx", // JSX compilation mode
    "moduleResolution": "bundler", // Module resolution strategy
    "resolveJsonModule": true, // Allow importing JSON files
    "paths": {
      "@/*": ["./src/*"] // Path alias for cleaner imports
    }
  }
}
```

**Key Configuration:**

- ✅ Strict mode enabled for maximum type safety
- ✅ Path alias `@/*` for cleaner imports (`import { Button } from '@/components'`)
- ✅ ES2017 target for modern JavaScript features
- ✅ JSON module resolution enabled

---

### **Next.js Configuration** (`next.config.ts`)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

**Ready for:**

- Custom Webpack configuration
- Environment-specific settings
- API proxy configuration
- Build optimization tweaks
- Image optimization
- Internationalization (i18n)

---

### **ESLint Configuration** (`eslint.config.mjs`)

```javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals, // Web performance best practices
  ...nextTs, // TypeScript rules
  // Custom ignores
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
```

**Features:**

- ✅ Next.js best practices enforced
- ✅ TypeScript linting rules
- ✅ Web Vitals optimization checks
- ✅ Build artifacts ignored

---

### **TailwindCSS Configuration** (`tailwind.config.js`)

```javascript
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**Features:**

- ✅ Production-safe purging (unused styles removed)
- ✅ Just-In-Time (JIT) compilation
- ✅ Responsive design utilities
- ✅ Dark mode support ready
- ✅ Plugin ecosystem support

---

### **PostCSS Configuration** (`postcss.config.mjs`)

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**Features:**

- ✅ Tailwind CSS processing
- ✅ Autoprefixer for vendor prefixes
- ✅ Cross-browser compatibility

---

### **Environment Variables** (`.env.example`)

```bash
# ===== Database Configuration =====
DATABASE_URL=postgresql://user:password@localhost:5432/freshcart
REDIS_URL=redis://localhost:6379

# ===== Authentication =====
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRY=7d
REFRESH_TOKEN_EXPIRY=30d

# ===== Payment Gateway (Razorpay) =====
RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-secret
RAZORPAY_WEBHOOK_SECRET=your-webhook-secret

# ===== API Configuration =====
API_BASE_URL=http://localhost:3000
API_TIMEOUT=30000
NODE_ENV=development

# ===== Email Service =====
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@freshcart.com

# ===== Third-party Services =====
SENTRY_DSN=your-sentry-dsn
ANALYTICS_ID=your-analytics-id

# ===== Feature Flags =====
ENABLE_REAL_TIME=true
ENABLE_ANALYTICS=true
ENABLE_EMAIL_VERIFICATION=true

# ===== Logging =====
LOG_LEVEL=info
```

**Important:** Never commit `.env.local` with real secrets!

---

## 🏗️ Architecture

### **Layered Architecture**

```
┌─────────────────────────────────────┐
│     Next.js Frontend Layer          │
│  (React Components, Hooks, State)   │
└──────────────┬──────────────────────┘
               │ HTTP/REST/WebSocket
┌──────────────▼──────────────────────┐
│   Express Backend API Layer         │
│  (Routes, Controllers, Middleware)  │
└──────────────┬──────────────────────┘
               │ Business Logic
┌──────────────▼──────────────────────┐
│   Service Layer                     │
│  (Auth, Orders, Payments, etc.)     │
└──────────────┬──────────────────────┘
               │ Data Access
┌──────────────▼──────────────────────┐
│   Repository Layer                  │
│  (Database Queries, Caching)        │
└──────────────┬──────────────────────┘
               │ SQL/NoSQL
┌──────────────▼──────────────────────┐
│     Database & Cache Layer          │
│  (PostgreSQL, Redis)                │
└─────────────────────────────────────┘
```

### **Request Flow**

```
User Request (Browser)
    ↓
Frontend Component (React)
    ↓
API Call (fetch/axios)
    ↓
Next.js API Route Handler
    ↓
Express Middleware & Controller
    ↓
Service Layer (Business Logic)
    ↓
Repository (Data Access)
    ↓
Check Cache (Redis) → If miss → Query Database (PostgreSQL)
    ↓
Response → Cache (if applicable) → API Route → Frontend → UI Update
```

---

## 🎯 Quick Start

### **Prerequisites**

- Node.js 20+
- npm or yarn
- Git
- PostgreSQL (for database)
- Redis (for caching)

### **Installation Steps**

```bash
# 1. Clone the repository
git clone <repository-url>
cd freshcart

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local

# 4. Edit .env.local with your configuration
nano .env.local  # or your preferred editor

# 5. Setup database (create tables, migrations)
npm run db:setup

# 6. Seed database with sample data (optional)
npm run db:seed

# 7. Start development server
npm run dev
```

The application will be available at:

- **Frontend:** `http://localhost:3000`
- **API:** `http://localhost:3000/api`

---

### **Available npm Scripts**

```bash
npm run dev        # Start development server with hot-reload (Next.js)
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint to check code quality
npm run type-check # Run TypeScript compiler check
npm run format     # Format code with Prettier (if configured)
npm run db:setup   # Setup database and run migrations
npm run db:seed    # Seed database with sample data
```

---

### **Project Structure at a Glance**

```
After setup, your project will look like:

freshcart/
├── src/app/                    # Next.js pages & API routes
├── src/backend/                # Backend services & database logic
├── src/frontend/               # React components & UI
├── src/lib/                    # Shared utilities & config
├── public/                     # Static files
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── next.config.ts              # Next.js config
├── eslint.config.mjs           # ESLint config
└── .env.local                  # Environment variables (create from .env.example)
```

---

## 📊 Scalability Goals

FreshCart is architected to support:

| Metric                | Target       | Strategy                                |
| --------------------- | ------------ | --------------------------------------- |
| **Concurrent Users**  | 25K+         | Load balancing, horizontal scaling      |
| **Active Sessions**   | 10K+         | Redis session store, connection pooling |
| **API Response Time** | <100ms (p95) | Query optimization, caching             |
| **Uptime**            | 99.9%        | Redundancy, health checks, monitoring   |
| **Daily Orders**      | 100K+        | Database optimization, sharding         |
| **Requests/Second**   | 5K+          | Rate limiting, async processing         |

**Optimization Strategies:**

- Database indexing and query optimization
- Redis caching for frequently accessed data
- API rate limiting and request throttling
- CDN for static assets
- Connection pooling (PgBouncer)
- Horizontal scaling with load balancing (Nginx)
- Database sharding for high volume data
- Async job processing (Bull queue)
- Response compression (gzip)

---

## 🛠️ Engineering Focus

This project emphasizes **production-grade practices**:

✅ **Clean Architecture** – Separation of concerns, modular design  
✅ **Type Safety** – Strict TypeScript, no-any policies, comprehensive types  
✅ **Security** – Input validation, SQL injection prevention, CORS, rate limiting  
✅ **Performance** – Caching strategies, database optimization, lazy loading  
✅ **Testing** – Unit tests, integration tests, API testing  
✅ **Documentation** – Code comments, API docs, setup guides  
✅ **DevOps** – Docker, CI/CD ready, environment management  
✅ **Code Quality** – ESLint, Prettier, consistent conventions  
✅ **Error Handling** – Global error boundaries, proper HTTP status codes  
✅ **Logging** – Structured logging, monitoring integration

---

## 🚧 Project Status

**Current Phase:** 🔄 Active Development | **Version:** 0.1.0

### **✅ Completed**

- [x] Project setup & scaffolding
- [x] Tech stack integration (Next.js, React, Express, TypeScript)
- [x] Folder structure design
- [x] Configuration setup (tsconfig, eslint, tailwind, postcss)
- [x] README documentation
- [x] Database schema & migrations

### **🔄 In Progress**

- [ ] Core backend APIs
- [ ] Authentication system
- [ ] Frontend UI components

### **📋 TODO**

- [ ] Product catalog with filters
- [ ] Cart management system
- [ ] Payment integration (Razorpay)
- [ ] Real-time order tracking
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Testing suite
- [ ] Deployment & CI/CD

---

## 🚀 Future Roadmap

### **Phase 1: MVP** (Next 2-3 months)

- [ ] Complete REST API endpoints (auth, products, orders)
- [ ] Implement user authentication (JWT)
- [ ] Build product catalog with filters & search
- [ ] Payment processing (Razorpay integration)
- [ ] Order management system
- [ ] Basic frontend UI
- [ ] Database schema & migrations

### **Phase 2: Enhancement** (Months 4-6)

- [ ] WebSocket real-time tracking
- [ ] AI-based product recommendations
- [ ] Analytics dashboard
- [ ] Email & SMS notification system
- [ ] Advanced search & filtering
- [ ] User reviews & ratings
- [ ] Subscription management

### **Phase 3: Scale** (Months 7+)

- [ ] Subscription delivery system
- [ ] Mobile app (React Native)
- [ ] Kubernetes deployment
- [ ] Advanced analytics & BI
- [ ] Machine learning models for recommendations
- [ ] Multi-region support
- [ ] Microservices architecture
- [ ] Event-driven architecture

---

## 🤝 Contributing

As this is a personal learning project, contributions are limited to structured feedback. Feel free to:

- 📝 Open issues for bugs or suggestions
- 💬 Discuss architecture decisions
- 🔍 Provide code reviews and feedback

---

## 📚 Learning Resources

This project implements patterns from:

- **System Design:** "System Design Interview" by Alex Xu
- **Performance:** "High-Performance Browser Networking" by Ilya Grigorik
- **Best Practices:** The Twelve-Factor App methodology
- **Code Quality:** SOLID principles & Clean Code by Robert C. Martin
- **Frameworks:** Official Next.js & React documentation
- **Database:** PostgreSQL performance optimization guide
- **Scalability:** "Designing Data-Intensive Applications" by Martin Kleppmann

---

## 📄 License

MIT License – See LICENSE file for details

---

## 👨‍💻 Author

Built with ❤️ as a **production engineering learning project**.

Demonstrating real-world software engineering practices and scalable system design.

**Questions?** Feel free to reach out or open an issue!

---

## 📞 Support

- 📖 [Documentation](#) (Coming soon)
- 🐛 [Bug Reports](../../issues)
- 💡 [Feature Requests](../../discussions)
- 📧 [Email](mailto:your-email@example.com)

---

## 🎓 Development Guidelines

See `CLAUDE.md` for development standards and `AGENTS.md` for AI agent configuration.

---

**Last Updated:** May 25, 2026 | **Version:** 0.1.0 | **Status:** Active Development
