// Simple seed script to create or update an admin user
// Run with: node scripts/seedAdmin.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function upsertAdmin() {
  try {
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || 'ChangeMe!123';
    const name = process.env.ADMIN_NAME || 'Admin User';

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
      where: { email: email.toLowerCase() },
      update: {
        name,
        password: hashed,
        role: 'admin',
      },
      create: {
        name,
        email: email.toLowerCase(),
        password: hashed,
        role: 'admin',
      },
    });

    console.log('Admin user upserted:', { id: user.id, email: user.email, role: user.role });
  } catch (err) {
    console.error('Error upserting admin user:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

upsertAdmin();
