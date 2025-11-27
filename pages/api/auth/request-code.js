import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/email';

// Generate 6-digit code
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Only allow admin email
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    if (email !== adminEmail) {
      // Don't reveal if email exists or not for security
      return res.status(200).json({ 
        success: true, 
        message: 'If this email is registered as admin, a verification code has been sent.' 
      });
    }

    // Generate new code
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Clear old codes for this email
    await db.verificationCode.deleteMany({
      where: { email },
    });

    // Create new code
    await db.verificationCode.create({
      data: {
        email,
        code,
        expiresAt,
      },
    });

    // Send email
    await sendVerificationEmail(email, code);

    return res.status(200).json({
      success: true,
      message: 'Verification code sent to your email',
    });
  } catch (error) {
    console.error('Request code error:', error);
    return res.status(500).json({ error: 'Failed to send verification code' });
  }
}
