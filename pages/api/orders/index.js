import { db } from '@/lib/db';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const orders = await db.rentalOrder.findMany({
        include: {
          user: true,
          item: true,
        },
      });
      return res.status(200).json(orders);
    }

    if (req.method === 'POST') {
      const { userId, itemId, rentStartDate, rentEndDate, totalPrice, status } = req.body;

      if (!userId || !itemId || !rentStartDate || !rentEndDate) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const order = await db.rentalOrder.create({
        data: {
          userId,
          itemId,
          rentStartDate: new Date(rentStartDate),
          rentEndDate: new Date(rentEndDate),
          totalPrice: parseFloat(totalPrice) || 0,
          status: status || 'pending',
        },
        include: {
          user: true,
          item: true,
        },
      });

      return res.status(201).json(order);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Orders API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
