# AJX Technologies - Full Stack Website

A modern, full-stack website for AJX Technologies built with Next.js 15, React 19, TypeScript, and MongoDB. Features a comprehensive admin panel (currently in Demo Mode) for content management and a beautiful, responsive public-facing website.


## Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Ajx-Tecnologies-Website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your values
```

Required environment variables:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your_secret_ke
ADMIN_EMAIL=admin@ajx.com
ADMIN_PASSWORD=A@dmin36
```

4. **Run the development server**
```bash
npm run dev
```

5. **Access the application**
- **Website**: http://localhost:3001
- **Admin Panel**: http://localhost:3001/admin/login

Default admin credentials:
- Email: `admin@ajx.com`
- Password: `A@dmin36`

## 📁 Project Structure

```
Ajx-Tecnologies-Website/
├── public/                              # Static assets
│   └── logo.png
│
│   auth.config.ts
│   middleware.ts
│
├───app
│   │   globals.css
│   │   layout.tsx
│   │
│   ├───(public)
│   │   │   layout.tsx
│   │   │   page.tsx
│   │   │
│   │   ├───about-us
│   │   │       page.tsx
│   │   │
│   │   ├───blog
│   │   │       page.tsx
│   │   │
│   │   ├───career
│   │   │       page.tsx
│   │   │
│   │   ├───contact
│   │   │       page.tsx
│   │   │
│   │   ├───our-portfolio
│   │   │       page.tsx
│   │   │
│   │   └───our-services
│   │           page.tsx
│   │
│   ├───admin
│   │   │   layout.tsx
│   │   │
│   │   ├───blog
│   │   │   │   page.tsx
│   │   │   │
│   │   │   └───_components
│   │   │           BlogForm.tsx
│   │   │
│   │   ├───career
│   │   │   │   page.tsx
│   │   │   │
│   │   │   └───_components
│   │   │           CareerForm.tsx
│   │   │
│   │   ├───contact
│   │   │   │   page.tsx
│   │   │   │
│   │   │   └───[id]
│   │   │           page.tsx
│   │   │
│   │   ├───dashboard
│   │   │       page.tsx
│   │   │
│   │   ├───login
│   │   │       page.tsx
│   │   │
│   │   ├───portfolio
│   │   │   │   page.tsx
│   │   │   │
│   │   │   └───_components
│   │   │           PortfolioForm.tsx
│   │   │
│   │   ├───services
│   │   │       page.tsx
│   │   │
│   │   └───users
│   │       │   page.tsx
│   │       │
│   │       └───[id]
│   │               page.tsx
│   │
│   ├───api
│   │   ├───admin
│   │   │   ├───change-password
│   │   │   │       route.ts
│   │   │   │
│   │   │   └───users
│   │   │           route.ts
│   │   │
│   │   ├───auth
│   │   │   └───[...nextauth]
│   │   │           route.ts
│   │   │
│   │   ├───blog
│   │   │       route.ts
│   │   │
│   │   ├───career
│   │   │       route.ts
│   │   │
│   │   ├───contact
│   │   │       route.ts
│   │   │
│   │   ├───portfolio
│   │   │       route.ts
│   │   │
│   │   ├───services
│   │   │       route.ts
│   │   │
│   │   └───swagger
│   │           route.ts
│   │
│   └───api-docs
│           page.tsx
│
├───components
│   │   ErrorBoundary.tsx
│   │
│   ├───atoms
│   │   ├───Button
│   │   │       Button.tsx
│   │   │
│   │   ├───Input
│   │   │       Input.tsx
│   │   │
│   │   └───Textarea
│   │           Textarea.tsx
│   │
│   ├───molecules
│   │   └───ServiceCard
│   │           ServiceCard.tsx
│   │
│   ├───organisms
│   │   ├───Footer
│   │   │       Footer.tsx
│   │   │
│   │   └───Header
│   │           Header.tsx
│   │
│   └───ui
│           Skeleton.tsx
│
├───hooks
│       useBlog.ts
│       useCareer.ts
│       usePortfolio.ts
│       useServices.ts
│
├───lib
│       auth.ts
│       axios.ts
│       iconMap.ts
│       mongodb.ts
│       swagger.ts
│
├───models
│       Blog.ts
│       Career.ts
│       Contact.ts
│       Portfolio.ts
│       Service.ts
│       User.ts
│
├───providers
│       QueryProvider.tsx
│
├───schemas
│       index.ts
│
├───services
│       blog.api.ts
│       career.api.ts
│       contact.api.ts
│       portfolio.api.ts
│       services.api.ts
│
└───types        index.ts
│
├── .env.local                           # Environment variables (gitignored)
├── .env.example                         # Environment template (committed)
├── .gitignore                           # Git ignore rules
├── next.config.ts                       # Next.js configuration
├── tailwind.config.ts                   # Tailwind CSS configuration
├── tsconfig.json                        # TypeScript configuration
├── package.json                         # Dependencies & scripts
├── README.md                            # This file
```

### 📂 Key Directories Explained

**`/app`** - Next.js App Router (file-based routing)
- Route groups: `(public)` for public pages
- Dynamic routes: `[id]` for edit pages
- API routes in `/api` folder

**`/components`** - Organized using Atomic Design
- **Atoms**: Smallest reusable elements
- **Molecules**: Combinations of atoms
- **Organisms**: Complex, standalone components

**`/hooks`** - Custom React Query hooks for data fetching
- Auto-caching, background sync, optimistic updates
- Replaces traditional state management (no Zustand/Redux needed)

**`/services`** - API client layer with Axios
- Centralized API calls
- Request/response interceptors
- Error handling

**`/schemas`** - Zod validation schemas
- Type-safe forms
- Runtime validation
- Automatic TypeScript types

**`/providers`** - React Context providers
- QueryProvider wraps app with React Query
- Includes DevTools for development

**`/models`** - MongoDB schemas with Mongoose
- Database models
- Validation rules
- Helper methods

**`/lib`** - Utility functions
- Database connection (cached)
- Axios configuration
- Auth setup

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5.7** - Type safety
- **Tailwind CSS 3.4** - Utility-first CSS
- **@tanstack/react-query** ✨ - Server state management with auto-caching
- **Zod** ✨ - Schema validation for type-safe forms
- **Sonner** ✨ - Toast notifications
- **React Hook Form** - Form management
- **Axios** ✨ - HTTP client with interceptors
- **date-fns** - Date formatting

### Backend
- **Next.js API Routes** - Serverless API
- **MongoDB 6.10** - Database
- **Mongoose** - MongoDB ODM
- **NextAuth.js v5** - Authentication

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **React Query DevTools** - State debugging

### Performance Features
- ✅ Automatic data caching (React Query)
- ✅ Optimistic UI updates (instant feedback)
- ✅ Background data synchronization
- ✅ Image optimization (Next.js Image)
- ✅ Error boundaries (crash protection)
- ✅ Skeleton loading states

### State Management
- **React Query** - Server state (API data, caching, background sync)
- **React Hooks** - Client state (UI toggles, modals)
- **React Hook Form** - Form state (validation, submission)
- **NextAuth** - Authentication state (sessions)

## 🎨 Features

### Public Website
- ✅ Homepage with hero, services, testimonials
- ✅ About Us page
- ✅ Services showcase
- ✅ Portfolio/Projects gallery
- ✅ Blog with articles
- ✅ Career/Job listings
- ✅ Contact form
- ✅ Fully responsive design
- ✅ SEO optimized

### Admin Panel
- ✅ Secure authentication
- ✅ Dashboard with statistics
- ✅ **Services Management** - Create, edit, delete services
- ✅ **Portfolio Management** - Manage projects
- ✅ **Blog Management** - Write and publish articles
- ✅ **Career Management** - Post job openings
- ✅ **Contact Management** - View and manage form submissions

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🔐 Authentication

The admin panel uses NextAuth.js v5 with credentials-based authentication. The admin user is automatically created on first login attempt.

**Default credentials:**
- Email: admin@ajx.com
- Password: A@dmin36

⚠️ **IMPORTANT**: Change these credentials in production!

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP (or use 0.0.0.0/0 for development)
5. Get your connection string
6. Add it to `.env.local` as `MONGODB_URI`

### Local MongoDB

```bash
# Install MongoDB locally
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community
# Linux: apt-get install mongodb

# Start MongoDB
mongod

# Connection string
MONGODB_URI=mongodb://localhost:27017/ajx-technologies
```

## 🎯 Admin Panel Usage

### Managing Services
1. Login to admin panel
2. Navigate to "Services"
3. Click "+ Add New Service"
4. Fill in title, description, icon
5. Toggle "Active" status
6. Save

### Managing Portfolio
1. Go to "Portfolio"
2. Add project details
3. Upload image URL
4. Set category and technologies
5. Mark as "Featured" to show on homepage

### Managing Blog
1. Navigate to "Blog"
2. Create new post
3. Write content (Markdown supported)
4. Set category and tags
5. Toggle "Published" status

### Managing Careers
1. Go to "Careers"
2. Post new job opening
3. Add requirements and responsibilities
4. Toggle "Active" status

### Viewing Contact Submissions
1. Navigate to "Contacts"
2. View all messages
3. Update status (New/Read/Replied)
4. Click "View" for full message details

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Deploy to Other Platforms

The app can be deployed to any Node.js hosting platform:
- Netlify
- Railway
- Render
- AWS
- DigitalOcean

Make sure to:
1. Set all environment variables
2. Run `npm run build`
3. Start with `npm start`

## 🐛 Troubleshooting

### "Invalid time value" errors
- Check that date fields in the database are valid
- The app now handles missing dates gracefully

### Hydration errors
- Restart the dev server
- Clear `.next` folder: `rm -rf .next && npm run dev`

### Database connection errors
- Verify MongoDB connection string
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### Admin login issues
- Check `NEXTAUTH_SECRET` is set (min 32 characters)
- Verify `NEXTAUTH_URL` matches your domain
- Check admin credentials in `.env.local`

## 🔌 API Documentation

### Authentication

**Login**
```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "admin@ajx.com",
  "password": "A@dmin36"
}
```

### Services API

**Get All Services**
```http
GET /api/services
```

**Get Single Service**
```http
GET /api/services/:id
```

### Response Format

**Success Response**
```json
{
  "success": true,
  "data": { /* resource data */ }
}
```

**Error Response**
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🔧 Development Workflow

### Code Structure Best Practices

1. **Components** - Use Atomic Design pattern
2. **Hooks** - React Query for all API data
3. **Forms** - React Hook Form + Zod validation
4. **Styling** - Tailwind CSS utility classes
5. **Types** - TypeScript strict mode enabled

```

## �📄 License

This project is proprietary and confidential.

## 👥 Support

For support, email admin@ajx.com or contact the development team.

---

**Built with by AJX Technologies Team**

**Tech Stack:** Next.js 15 · React 19 · TypeScript · MongoDB · React Query · Zod · NextAuth  
**Version:** 1.0.0  
**Last Updated:** December 2025