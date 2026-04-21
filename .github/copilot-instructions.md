## MERN eCommerce Platform - Development Guide

### Project Overview
This is a production-grade MERN (MongoDB, Express, React, Node.js) eCommerce platform with Neo-Brutalism design, built with:
- **Frontend**: React 18 + Vite + Redux Toolkit + React Router + Tailwind CSS (Neo-Brutalism)
- **Backend**: Node.js + Express + MongoDB + Mongoose
- **Design**: Neo-Brutalism with bold colors, thick borders, sharp edges
- **Currency**: PKR (Pakistani Rupee)
- **Deployment**: AWS (EC2, S3, CloudFront)

### Key Architectural Principles
1. **Modular Backend**: MVC pattern with service layer abstraction
2. **Separation of Concerns**: Controllers → Services → Models
3. **Scalable Design**: Modular feature structure (auth, products, orders, etc.)
4. **Security First**: JWT, bcrypt, rate limiting, CORS, helmet, input validation
5. **Production Ready**: No placeholders, complete features, proper error handling

### Getting Started

#### Prerequisites
- Node.js 18+ and npm 9+
- MongoDB (local or Atlas)
- AWS account (for deployment)

#### Setup Instructions

1. **Clone and Install**
   ```bash
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Setup** (in another terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Seed Database**
   ```bash
   npm run seed
   ```

### Project Structure

```
mern-ecommerce/
├── backend/
│   ├── src/
│   │   ├── modules/          # Feature modules (auth, products, etc.)
│   │   ├── controllers/      # Route controllers
│   │   ├── services/         # Business logic
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API routes
│   │   ├── middlewares/      # Express middlewares
│   │   ├── utils/            # Helper functions
│   │   ├── config/           # Database, JWT configs
│   │   ├── constants/        # App constants
│   │   └── index.js          # Express app entry
│   ├── tests/                # Jest tests
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # React components (Neo-Brutalism)
│   │   ├── pages/            # Page components
│   │   ├── redux/            # Redux store, slices
│   │   ├── hooks/            # Custom React hooks
│   │   ├── api/              # API client
│   │   ├── utils/            # Utilities
│   │   ├── styles/           # Tailwind config, globals
│   │   ├── constants/        # Constants
│   │   └── App.jsx
│   ├── public/               # Static assets
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── scripts/                  # Database seeding scripts
└── package.json              # Root workspace config
```

### Core Features

#### Authentication
- Email/password login with JWT
- Role-based access control (admin, customer)
- Refresh token rotation
- Protected API routes

#### Products
- Full CRUD operations (admin only)
- Filtering, sorting, pagination
- Search with MongoDB text index
- Product variants (size, color)
- Ratings and reviews

#### Orders & Checkout
- Shopping cart persistence
- Checkout flow (shipping, summary, mock payment)
- Order status tracking (pending → paid → shipped → delivered)
- Admin order management

#### Additional Features
- Wishlist with persistence
- Coupons (percentage, fixed amount)
- Product recommendations (category/tag similarity)
- Full-text search with autocomplete
- Admin dashboard with analytics

#### Design (Neo-Brutalism via Tailwind)
- Bold, contrasting colors
- Thick borders (4-8px)
- Sharp edges (no border-radius)
- Hard shadow offsets
- Strong typography hierarchy
- Fully responsive (mobile-first)
- Dark/light mode support

### API Standards

#### Response Format
```json
{
  "success": true,
  "statusCode": 200,
  "data": { ... },
  "message": "Operation successful"
}
```

#### Error Handling
```json
{
  "success": false,
  "statusCode": 400,
  "error": { "code": "INVALID_INPUT", "details": "..." },
  "message": "Validation failed"
}
```

#### Common Routes Pattern
- `GET /api/v1/resource` - List with pagination/filtering
- `POST /api/v1/resource` - Create
- `GET /api/v1/resource/:id` - Get single
- `PUT /api/v1/resource/:id` - Update
- `DELETE /api/v1/resource/:id` - Delete

### Backend Development

#### Adding a New Feature Module
1. Create module folder: `src/modules/feature-name/`
2. Implement controller, service, model, route
3. Register route in main Express app
4. Add Jest tests in `tests/`

#### Database Queries
- Use Mongoose models for all queries
- Implement service layer for business logic
- Use lean() for read-only queries
- Index frequently filtered fields

#### Error Handling
- Use centralized error middleware
- Custom error classes in `utils/errors.js`
- Consistent error response format

### Frontend Development

#### Component Structure (Neo-Brutalism)
- Use Tailwind utility classes
- Apply thick borders: `border-4` or `border-8`
- Hard shadows: `shadow-xl` with offset
- Bold typography: `font-bold` + `text-lg` or larger
- Sharp edges: avoid rounded corners
- High contrast colors from Neo-Brutalism palette

#### State Management
- Global state in Redux (auth, user, products, cart)
- Local state with useState for UI
- Redux middleware for API calls (redux-thunk)

#### Form Validation
- Client-side with Zod/Yup
- Server validation always enforced
- Consistent error display

### Testing

#### Backend Tests (Jest)
```bash
npm run test:backend
```
- Unit tests for services/utilities
- Integration tests for API routes
- Minimum 70% coverage on critical paths

#### Frontend Tests
```bash
npm run test:frontend
```
- Component rendering tests
- Redux state tests
- Integration tests for key flows

### Deployment

#### AWS EC2 (Backend)
1. Create EC2 instance (Node.js AMI)
2. Install PM2 for process management
3. Setup NGINX as reverse proxy
4. Configure SSL/HTTPS
5. Deploy via git or CI/CD

#### AWS S3 + CloudFront (Frontend)
1. Build: `npm run build`
2. Upload `dist/` to S3
3. Invalidate CloudFront distribution
4. Update DNS to CloudFront domain

### Security Checklist
- [ ] JWT stored in httpOnly cookies
- [ ] All inputs validated (Joi/Zod)
- [ ] Rate limiting enabled
- [ ] CORS configured for allowed origins
- [ ] Helmet.js security headers installed
- [ ] Password hashing with bcrypt
- [ ] Environment variables secured
- [ ] MongoDB injection protection
- [ ] XSS protection enabled
- [ ] HTTPS enforced

### Monitoring & Logging

#### Backend Logging
- Request logging: Morgan
- Error logging: Winston
- Central log aggregation ready

#### Health Check
- `GET /api/v1/health` - Server status

### Common Commands

```bash
# Development
npm run dev              # Run both frontend & backend
npm run dev -w backend   # Backend only
npm run dev -w frontend  # Frontend only

# Production
npm run build            # Build both
npm run start            # Start backend

# Testing & Quality
npm run test             # All tests
npm run lint             # Linting
npm run format           # Code formatting
npm run seed             # Database seeding

# Database
npm run seed             # Seed test data
```

### Troubleshooting

#### MongoDB Connection Issues
- Ensure MongoDB service is running
- Check MONGODB_URI in .env
- Verify network access for Atlas

#### JWT Token Errors
- Clear localStorage/cookies
- Check JWT_SECRET matches backend
- Verify token hasn't expired

#### Frontend API Calls Fail
- Check VITE_API_BASE_URL
- Verify backend is running
- Check CORS configuration

### Performance Tips

1. **Lazy Loading**: Code-split pages with React.lazy()
2. **Image Optimization**: CloudFront CDN for assets
3. **Database**: Index frequently queried fields
4. **API Caching**: Use Redis for frequent queries
5. **Debouncing**: Debounce search, filter queries

### Documentation Links
- API Docs: `/api/v1/docs` (Swagger - if implemented)
- Deployment: See AWS folder in repo
- Database Schema: See `backend/src/models/`

### Support & Contribution
- Issues: Create GitHub issues
- PRs: Follow conventional commits
- Code Style: ESLint + Prettier configured

---

**Last Updated**: April 2026
**Maintainer**: Development Team
