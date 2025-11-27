import prisma from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const routes = await prisma.transportRoute.findMany({
        include: { bookings: { select: { id: true } } },
      });
      return res.status(200).json(routes);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch routes' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, origin, destination, distance, price, schedule } = req.body;
      if (!name || !origin || !destination) {
        return res.status(400).json({ error: 'Required fields missing' });
      }
      const route = await prisma.transportRoute.create({
        data: { name, origin, destination, distance: parseFloat(distance), price: parseFloat(price), schedule },
      });
      return res.status(201).json(route);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create route' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
