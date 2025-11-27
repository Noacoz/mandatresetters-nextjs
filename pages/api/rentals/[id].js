import { db } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const itemId = parseInt(id);

    if (req.method === 'GET') {
      const item = await db.rentalItem.findUnique({
        where: { id: itemId },
        include: {
          rentalOrders: true,
        },
      });

      if (!item) {
        return res.status(404).json({ error: 'Rental item not found' });
      }

      return res.status(200).json(item);
    }

    if (req.method === 'PUT') {
      const { name, category, price, available } = req.body;

      const item = await db.rentalItem.update({
        where: { id: itemId },
        data: {
          name: name || undefined,
          category: category || undefined,
          price: price ? parseFloat(price) : undefined,
          available: available !== undefined ? available : undefined,
        },
        include: {
          rentalOrders: true,
        },
      });

      return res.status(200).json(item);
    }

    if (req.method === 'DELETE') {
      await db.rentalItem.delete({
        where: { id: itemId },
      });

      return res.status(200).json({ message: 'Rental item deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Rental item detail API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
