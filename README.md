# MERN eCommerce Platform

A production-grade MERN eCommerce platform with **true Neo-Brutalism design** using Tailwind CSS. Built with bold colors, thick borders, sharp edges, and maximum visual impact.

## 🎨 Design Philosophy: Neo-Brutalism

This platform embraces Neo-Brutalism with:
- **Bold, contrasting colors** (Red, Blue, Yellow, Neon Cyan, Lime Green, Orange)
- **Thick borders** (6-8px)
- **Sharp, hard edges** (no rounded corners)
- **Hard shadow offsets** (4px to 16px)
- **Strong typography hierarchy** (all-caps, bold fonts)
- **Maximum visual contrast** and impact

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- MongoDB (local or Atlas)
- AWS account (for deployment)

### Installation

```bash
# Clone and install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### Development

```bash
# Run both frontend and backend (from root)
npm run dev

# Or run separately
npm run dev -w backend    # Terminal 1
npm run dev -w frontend   # Terminal 2

# Seed database (from root)
npm run seed
```

**Access:**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api/v1`
- Health Check: `http://localhost:5000/api/v1/health`

## 📁 Project Structure

```
mern-ecommerce/
├── backend/
│   ├── src/
│   │   ├── config/           # Database & JWT configuration
│   │   ├── constants/        # App constants
│   │   ├── controllers/      # Route handlers
│   │   ├── middlewares/      # Auth, error handling, logging
│   │   ├── models/           # Mongoose schemas (User, Product, Order, etc.)
│   │   ├── routes/           # API route definitions
│   │   ├── services/         # Business logic layer
│   │   ├── utils/            # Helpers, validation, error classes
│   │   └── index.js          # Express app entry
│   ├── tests/                # Jest unit & integration tests
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/              # API client & endpoints
│   │   ├── components/       # React components (Neo-Brutalism styled)
│   │   ├── config/           # Frontend configuration
│   │   ├── constants/        # Constants & enums
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page components
│   │   ├── redux/            # Redux store, slices
│   │   │   └── slices/       # auth, cart, products
│   │   ├── styles/           # Global CSS, Tailwind config
│   │   ├── utils/            # Utilities
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # React entry point
│   ├── index.html            # HTML template
│   ├── vite.config.js        # Vite configuration
│   ├── tailwind.config.js    # Tailwind + Neo-Brutalism theme
│   └── package.json
│
├── scripts/
│   └── seed.js               # Database seeding script
│
├── .env.example              # Environment template
├── .gitignore
├── package.json              # Root workspace config
└── README.md
```

## 🔑 Features

### Authentication
- ✅ Email/password registration & login
- ✅ JWT with access & refresh tokens
- ✅ Role-based access control (admin/customer)
- ✅ Protected routes (frontend & backend)
- ✅ Password hashing with bcrypt

### Products
- ✅ Admin CRUD operations
- ✅ Pagination, sorting, filtering
- ✅ Full-text search with MongoDB text index
- ✅ Product variants (size, color)
- ✅ Stock management
- ✅ Ratings & reviews support

### Shopping
- ✅ Shopping cart (persistent, local + backend)
- ✅ Add/remove/update items
- ✅ Wishlist with persistence
- ✅ Product recommendations (category/tag similarity)

### Orders
- ✅ Complete checkout flow
- ✅ Shipping address collection
- ✅ Mock payment processing
- ✅ Order tracking (pending → paid → shipped → delivered)
- ✅ Admin order management

### Additional
- ✅ Coupon support (percentage/fixed discount)
- ✅ Tax calculation (17% default)
- ✅ Shipping costs
- ✅ Admin dashboard (orders, users, analytics)
- ✅ Dark/light mode support

## 🎨 Neo-Brutalism Styling

### Tailwind Color Palette
```
nb-black   → #000000
nb-white   → #FFFFFF
nb-red     → #E63946
nb-blue    → #1D3557
nb-yellow  → #F1FAEE
nb-pink    → #FF10F0
nb-cyan    → #00D9FF
nb-lime    → #CCFF00
nb-orange  → #FF6B35
nb-purple  → #6A0572
```

### Component Utilities
```javascript
// Buttons
btn-nb              // Border + shadow
btn-nb-primary      // Red background
btn-nb-secondary    // Blue background
btn-nb-success      // Lime background

// Cards
card-nb             // Thick border, shadow, padding

// Input
input-nb            // Thick border, shadow on focus

// Typography
text-nb-heading     // Max size, bold, all-caps
text-nb-title       // Large, bold, all-caps
```

## 🔐 Security Features

- ✅ JWT stored in localStorage (can be moved to httpOnly cookies)
- ✅ Input validation with Joi (backend) & Zod (frontend-ready)
- ✅ Bcrypt password hashing
- ✅ Rate limiting on API endpoints
- ✅ CORS configuration
- ✅ Helmet.js security headers
- ✅ MongoDB injection prevention
- ✅ XSS protection
- ✅ Environment variable protection

## 📊 API Endpoints

### Auth Routes (`/api/v1/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /refresh` - Refresh access token
- `POST /logout` - Logout user

### Product Routes (`/api/v1/products`)
- `GET /` - List products (paginated, filterable)
- `GET /search?q=query` - Search products
- `GET /categories` - Get all categories
- `GET /tags` - Get all tags
- `GET /:id` - Get product details
- `POST /` (admin) - Create product
- `PUT /:id` (admin) - Update product
- `DELETE /:id` (admin) - Delete product

### Cart Routes (`/api/v1/cart`)
- `GET /` - Get user cart
- `POST /` - Add item to cart
- `PUT /:productId` - Update cart item quantity
- `DELETE /:productId` - Remove item from cart
- `GET /total` - Calculate cart total
- `DELETE /` - Clear cart

### Order Routes (`/api/v1/orders`)
- `POST /` - Create order (checkout)
- `GET /` - Get user orders
- `GET /:id` - Get order details
- `GET /admin/list` (admin) - List all orders
- `PUT /:id/status` (admin) - Update order status
- `PUT /:id/payment-status` (admin) - Update payment status

### Wishlist Routes (`/api/v1/wishlist`)
- `GET /` - Get wishlist
- `POST /` - Add to wishlist
- `DELETE /:productId` - Remove from wishlist
- `DELETE /` - Clear wishlist

## 🧪 Testing

```bash
# Run all tests
npm run test

# Backend only
npm run test:backend

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```

### Deploy Backend (AWS EC2)
1. SSH into EC2 instance
2. Install Node.js & PM2
3. Clone repository
4. Install dependencies: `npm install`
5. Set environment variables
6. Start with PM2: `pm2 start src/index.js --name "ecommerce-api"`
7. Setup NGINX reverse proxy
8. Configure SSL certificate

### Deploy Frontend (AWS S3 + CloudFront)
1. Build: `npm run build`
2. Upload `dist/` folder to S3 bucket
3. Invalidate CloudFront distribution
4. Update DNS records

## 🛠️ Configuration

### Environment Variables

**Backend (.env)**
```
MONGODB_URI=mongodb://localhost:27017/mern-ecommerce
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
PORT=5000
NODE_ENV=development
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET=your-bucket-name
```

**Frontend (.env)**
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📚 Tech Stack

**Frontend**
- React 18 + Vite
- Redux Toolkit + React Redux
- React Router 6
- Tailwind CSS 3 (with Neo-Brutalism theme)
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Bcryptjs
- Joi validation
- Winston logging
- Morgan request logging

**Tooling**
- ESLint + Prettier
- Jest testing framework
- Nodemon for development

## 🤝 Contributing

1. Follow existing code structure
2. Use naming conventions from models/controllers
3. Maintain 70%+ test coverage on critical paths
4. Follow ESLint configuration
5. Use Prettier for formatting

## 📝 License

MIT License - feel free to use for personal/commercial projects

## 🆘 Support

- Check `.github/copilot-instructions.md` for setup help
- Review backend `README` in backend folder
- Check specific model files for schema details
- Refer to API endpoint documentation above

---

**Last Updated**: April 2026
**Version**: 1.0.0
**Status**: Production-Ready
