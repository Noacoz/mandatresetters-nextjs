import { db } from '@/lib/db';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const bookings = await db.transportBooking.findMany({
        include: {
          user: true,
          route: true,
        },
      });
      return res.status(200).json(bookings);
    }

    if (req.method === 'POST') {
      const { userId, routeId, passengerName, passengerPhone, bookingDate, quantity, totalPrice, status } = req.body;

      if (!userId || !routeId || !passengerName || !passengerPhone) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const booking = await db.transportBooking.create({
        data: {
          userId,
          routeId,
          passengerName,
          passengerPhone,
          bookingDate: bookingDate ? new Date(bookingDate) : new Date(),
          quantity: parseInt(quantity) || 1,
          totalPrice: parseFloat(totalPrice) || 0,
          status: status || 'pending',
        },
        include: {
          user: true,
          route: true,
        },
      });

      return res.status(201).json(booking);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Bookings API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
