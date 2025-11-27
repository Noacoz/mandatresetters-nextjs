# Mandatresetters Holdings - Next.js 14 Application

A complete, production-ready Next.js 14 application for Mandatresetters Holdings, a diversified investment holding company.

## Features

✅ **Server & Client Components** - Optimized with App Router
✅ **Responsive Design** - Mobile-friendly across all pages
✅ **Full API Backend** - Serverless API routes with validation
✅ **Database Integration** - Prisma ORM with SQLite (configurable)
✅ **Authentication** - JWT-based auth with bcrypt
✅ **Admin Dashboard** - Manage routes, businesses, and bookings
✅ **Dynamic Routing** - Transport routes and business pages
✅ **Contact Forms** - Fully functional with API integration
✅ **Modern Styling** - CSS with theme variables
✅ **Production Ready** - Error handling, validation, loading states

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or navigate to project
cd mandatresetters-nextjs

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Setup database (first time)
npm run prisma:generate
npm run prisma:migrate

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Project Structure

```
mandatresetters-nextjs/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Home page
│   ├── about/page.js             # About page
│   ├── contact/page.js           # Contact page
│   ├── businesses/page.js        # All businesses
│   ├── businesses/[id]/page.js   # Business detail
│   ├── transport/page.js         # Transport routes
│   ├── transport/book/page.js    # Booking page
│   ├── transport/[id]/page.js    # Route detail
│   ├── (auth)/                   # Auth group layout
│   │   ├── register/page.js
│   │   └── login/page.js
│   └── admin/dashboard/page.js   # Admin panel
├── components/                   # React components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── BusinessCard.jsx
│   ├── TransportCard.jsx
│   └── Forms/
├── pages/api/                    # API routes
│   ├── auth/
│   ├── transport/
│   ├── businesses/
│   └── contact/
├── lib/                          # Utilities & database
│   ├── db.js
│   ├── auth.js
│   └── validators.js
├── prisma/                       # Database schema
│   └── schema.prisma
├── styles/                       # Global styles
│   └── globals.css
├── public/                       # Static files
│   └── images/
└── prisma/schema.prisma          # Database models
```

## API Routes

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Businesses
- `GET /api/businesses` - Get all businesses
- `GET /api/businesses/[id]` - Get business details

### Transport
- `GET /api/transport/routes` - Get all routes
- `GET /api/transport/routes/[id]` - Get route details
- `POST /api/transport/book` - Create booking

### Contact
- `POST /api/contact/send` - Send contact message

## Pages

### Public Pages
- **Home** (`/`) - Hero, portfolio, values, testimonials
- **About** (`/about`) - Company info and leadership
- **Businesses** (`/businesses`) - All portfolio companies
- **Business Detail** (`/businesses/[id]`) - Individual business page
- **Transport** (`/transport`) - All transport routes
- **Transport Detail** (`/transport/[id]`) - Route details
- **Contact** (`/contact`) - Contact form

### Auth Pages
- **Register** (`/register`) - User registration
- **Login** (`/login`) - User login

### Admin Pages
- **Dashboard** (`/admin/dashboard`) - Manage everything

## Database Models

- **User** - Users with auth
- **Business** - Portfolio companies
- **TransportRoute** - Transport routes
- **TransportBooking** - User bookings
- **ContactMessage** - Contact form submissions

## Environment Variables

See `.env.example` for all required variables. At minimum, set:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret_key"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Open Prisma Studio
npm run prisma:studio

# Run linter
npm run lint
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

### Self-hosted
1. Build: `npm run build`
2. Start: `npm start`
3. Configure reverse proxy (nginx)
4. Use PostgreSQL for database (change DATABASE_URL)

## Security

⚠️ **Important for Production:**
- Change `JWT_SECRET` to a strong random string
- Use PostgreSQL instead of SQLite
- Set `NODE_ENV=production`
- Enable HTTPS
- Use environment variables for sensitive data
- Implement rate limiting
- Add CSRF protection
- Validate all inputs

## Support

For issues or questions, contact: support@mandatresetters.com

## License

Proprietary - Mandatresetters Holdings ©2024
