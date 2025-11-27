import { db } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const bookingId = parseInt(id);

    if (req.method === 'GET') {
      const booking = await db.transportBooking.findUnique({
        where: { id: bookingId },
        include: {
          user: true,
          route: true,
        },
      });

      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      return res.status(200).json(booking);
    }

    if (req.method === 'PUT') {
      const { passengerName, passengerPhone, quantity, totalPrice, status } = req.body;

      const booking = await db.transportBooking.update({
        where: { id: bookingId },
        data: {
          passengerName: passengerName || undefined,
          passengerPhone: passengerPhone || undefined,
          quantity: quantity ? parseInt(quantity) : undefined,
          totalPrice: totalPrice ? parseFloat(totalPrice) : undefined,
          status: status || undefined,
        },
        include: {
          user: true,
          route: true,
        },
      });

      return res.status(200).json(booking);
    }

    if (req.method === 'DELETE') {
      await db.transportBooking.delete({
        where: { id: bookingId },
      });

      return res.status(200).json({ message: 'Booking deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Booking detail API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
