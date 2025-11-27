import { db } from '@/lib/db';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const messages = await db.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(messages);
    }

    if (req.method === 'POST') {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const msg = await db.contactMessage.create({
        data: {
          name,
          email,
          subject,
          message,
          status: 'unread',
        },
      });

      return res.status(201).json(msg);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Messages API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
