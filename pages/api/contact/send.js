/**
 * API Route: Contact Form Submission
 * POST /api/contact/send
 */

import prisma from '@/lib/db';
import { validateEmail, validateMessage, validateName, validatePhone } from '@/lib/validators';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, subject, message } = req.body;

    // Validation
    if (!validateName(name)) {
      return res.status(400).json({ error: 'Please provide a valid name (2-100 characters)' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    if (!subject || subject.trim().length === 0) {
      return res.status(400).json({ error: 'Subject is required' });
    }

    if (!validateMessage(message)) {
      return res.status(400).json({ error: 'Message must be between 10 and 5000 characters' });
    }

    // Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        company: company?.trim() || null,
        subject: subject.trim(),
        message: message.trim(),
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully',
      id: contactMessage.id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
