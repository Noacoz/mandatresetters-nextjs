import { db } from '@/lib/db';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const items = await db.rentalItem.findMany({
        include: {
          rentalOrders: true,
        },
      });
      return res.status(200).json(items);
    }

    if (req.method === 'POST') {
      const { name, category, price, available } = req.body;

      if (!name || !category || !price) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const item = await db.rentalItem.create({
        data: {
          name,
          category,
          price: parseFloat(price),
          available: available !== false,
        },
        include: {
          rentalOrders: true,
        },
      });

      return res.status(201).json(item);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Rentals API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
