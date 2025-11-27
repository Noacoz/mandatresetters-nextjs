import { db } from '@/lib/db';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Email and code are required' });
    }

    // Find verification code
    const verificationCode = await db.verificationCode.findFirst({
      where: {
        email,
        code,
        used: false,
      },
    });

    if (!verificationCode) {
      return res.status(401).json({ error: 'Invalid or expired verification code' });
    }

    // Check if expired
    if (new Date() > verificationCode.expiresAt) {
      return res.status(401).json({ error: 'Verification code has expired' });
    }

    // Mark code as used
    await db.verificationCode.update({
      where: { id: verificationCode.id },
      data: { used: true },
    });

    // Find user
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user || user.role !== 'admin') {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Verify code error:', error);
    return res.status(500).json({ error: 'Failed to verify code' });
  }
}
