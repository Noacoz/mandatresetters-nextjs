/**
 * API Route: Get All Contact Messages (Admin)
 * GET /api/admin/messages
 */

import prisma from '@/lib/db';
import { verifyToken, extractToken } from '@/lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check auth token
    const token = extractToken(req.headers.authorization);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = verifyToken(token);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden - Admin access required' });
    }

    // Get messages
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error('Admin messages API error:', error);
    return res.status(500).json({ error: 'Failed to fetch messages' });
  }
}
