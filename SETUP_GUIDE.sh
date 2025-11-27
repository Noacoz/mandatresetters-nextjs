#!/bin/bash
# Mandatresetters Admin System - Verification & Installation Guide

echo "================================"
echo "MANDATRESETTERS ADMIN SYSTEM"
echo "Installation & Verification Guide"
echo "================================"
echo ""

# Check Node.js installation
echo "1️⃣ Checking Node.js installation..."
if command -v node &> /dev/null; then
    node_version=$(node --version)
    npm_version=$(npm --version)
    echo "   ✅ Node.js $node_version"
    echo "   ✅ npm $npm_version"
else
    echo "   ❌ Node.js not found. Install Node.js 24.11.1 LTS"
    exit 1
fi

echo ""
echo "2️⃣ Checking project structure..."
required_dirs=(
    "app"
    "pages/api"
    "components"
    "lib"
    "styles"
    "prisma"
    "public"
)

for dir in "${required_dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "   ✅ $dir/"
    else
        echo "   ❌ $dir/ (MISSING)"
    fi
done

echo ""
echo "3️⃣ Checking key files..."
required_files=(
    "package.json"
    "next.config.js"
    "tsconfig.json"
    "prisma/schema.prisma"
    ".gitignore"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    else
        echo "   ❌ $file (MISSING)"
    fi
done

echo ""
echo "4️⃣ Checking components..."
components=(
    "components/Table.jsx"
    "components/Form.jsx"
    "components/Breadcrumbs.jsx"
    "components/EmptyState.jsx"
    "components/LoadingSpinner.jsx"
)

for comp in "${components[@]}"; do
    if [ -f "$comp" ]; then
        echo "   ✅ $(basename $comp)"
    else
        echo "   ❌ $(basename $comp) (MISSING)"
    fi
done

echo ""
echo "5️⃣ Checking page modules..."
modules=(
    "app/users"
    "app/routes"
    "app/bookings"
    "app/rentals"
    "app/orders"
    "app/payments"
    "app/reviews"
    "app/messages"
)

for module in "${modules[@]}"; do
    if [ -d "$module" ]; then
        # Count files in module
        file_count=$(find "$module" -name "*.js" -o -name "*.jsx" | wc -l)
        echo "   ✅ $(basename $module) ($file_count files)"
    else
        echo "   ❌ $(basename $module) (MISSING)"
    fi
done

echo ""
echo "6️⃣ Checking API routes..."
api_modules=(
    "pages/api/users"
    "pages/api/routes"
    "pages/api/bookings"
    "pages/api/rentals"
    "pages/api/orders"
    "pages/api/payments"
    "pages/api/reviews"
    "pages/api/messages"
)

for api in "${api_modules[@]}"; do
    if [ -d "$api" ]; then
        echo "   ✅ $(basename $api)"
    else
        echo "   ❌ $(basename $api) (MISSING)"
    fi
done

echo ""
echo "================================"
echo "INSTALLATION INSTRUCTIONS"
echo "================================"
echo ""
echo "1. Install dependencies:"
echo "   npm install"
echo ""
echo "2. Set up environment:"
echo "   cp .env.example .env.local"
echo "   # Edit .env.local with your configuration"
echo ""
echo "3. Initialize database:"
echo "   npx prisma migrate dev --name init"
echo ""
echo "4. Start development server:"
echo "   npm run dev"
echo ""
echo "5. Access the application:"
echo "   http://localhost:3000"
echo ""
echo "6. Access admin dashboard:"
echo "   http://localhost:3000/admin/dashboard"
echo ""
echo "================================"
echo "AVAILABLE MODULES"
echo "================================"
echo ""
echo "📊 Users Management"
echo "   http://localhost:3000/users"
echo ""
echo "🛣️ Routes Management"
echo "   http://localhost:3000/routes"
echo ""
echo "🎟️ Bookings Management"
echo "   http://localhost:3000/bookings"
echo ""
echo "📦 Rentals Management"
echo "   http://localhost:3000/rentals"
echo ""
echo "🛒 Orders Management"
echo "   http://localhost:3000/orders"
echo ""
echo "💳 Payments Management"
echo "   http://localhost:3000/payments"
echo ""
echo "⭐ Reviews Management"
echo "   http://localhost:3000/reviews"
echo ""
echo "💬 Messages Management"
echo "   http://localhost:3000/messages"
echo ""
echo "================================"
echo "PRODUCTION BUILD"
echo "================================"
echo ""
echo "npm run build    # Build optimized production bundle"
echo "npm start        # Start production server"
echo ""
echo "================================"
echo "DATABASE COMMANDS"
echo "================================"
echo ""
echo "npx prisma studio              # Open Prisma Studio"
echo "npx prisma migrate dev          # Run migrations"
echo "npx prisma db seed             # Seed database"
echo "npx prisma migrate reset       # Reset database (dev only)"
echo ""
echo "================================"
echo "GIT COMMANDS"
echo "================================"
echo ""
echo "git status                      # Check changes"
echo "git add .                       # Stage all changes"
echo "git commit -m 'message'         # Commit changes"
echo "git push origin main            # Push to GitHub"
echo ""
echo "================================"
echo "DEPLOYMENT"
echo "================================"
echo ""
echo "Repository: https://github.com/Noacoz/mandatresetters-nextjs"
echo ""
echo "To deploy to Vercel:"
echo "1. Connect GitHub repository"
echo "2. Set environment variables"
echo "3. Click Deploy"
echo ""
echo "================================"
echo "✅ READY TO GO!"
echo "================================"
