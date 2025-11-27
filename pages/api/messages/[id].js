import { db } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const messageId = parseInt(id);

    if (req.method === 'GET') {
      const msg = await db.contactMessage.findUnique({
        where: { id: messageId },
      });

      if (!msg) {
        return res.status(404).json({ error: 'Message not found' });
      }

      return res.status(200).json(msg);
    }

    if (req.method === 'PUT') {
      const { status } = req.body;

      const msg = await db.contactMessage.update({
        where: { id: messageId },
        data: {
          status: status || undefined,
        },
      });

      return res.status(200).json(msg);
    }

    if (req.method === 'DELETE') {
      await db.contactMessage.delete({
        where: { id: messageId },
      });

      return res.status(200).json({ message: 'Message deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Message detail API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
