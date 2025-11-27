import { db } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const orderId = parseInt(id);

    if (req.method === 'GET') {
      const order = await db.rentalOrder.findUnique({
        where: { id: orderId },
        include: {
          user: true,
          item: true,
        },
      });

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      return res.status(200).json(order);
    }

    if (req.method === 'PUT') {
      const { rentStartDate, rentEndDate, totalPrice, status } = req.body;

      const order = await db.rentalOrder.update({
        where: { id: orderId },
        data: {
          rentStartDate: rentStartDate ? new Date(rentStartDate) : undefined,
          rentEndDate: rentEndDate ? new Date(rentEndDate) : undefined,
          totalPrice: totalPrice ? parseFloat(totalPrice) : undefined,
          status: status || undefined,
        },
        include: {
          user: true,
          item: true,
        },
      });

      return res.status(200).json(order);
    }

    if (req.method === 'DELETE') {
      await db.rentalOrder.delete({
        where: { id: orderId },
      });

      return res.status(200).json({ message: 'Order deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Order detail API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
