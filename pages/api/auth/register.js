/**
 * API Route: User Registration
 * POST /api/auth/register
 */

import prisma from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';
import { validateEmail, validatePassword, validateName } from '@/lib/validators';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!validateName(name)) {
      return res.status(400).json({ error: 'Please provide a valid name' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters with uppercase and number',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
      },
      select: { id: true, name: true, email: true },
    });

    // Generate token
    const token = generateToken(user.id, user.email);

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      user,
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
}
