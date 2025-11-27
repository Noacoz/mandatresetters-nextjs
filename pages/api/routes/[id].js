import prisma from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const route = await prisma.transportRoute.findUnique({
        where: { id: parseInt(id) },
        include: { bookings: true },
      });
      if (!route) return res.status(404).json({ error: 'Route not found' });
      return res.status(200).json(route);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch route' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { name, origin, destination, distance, price, schedule } = req.body;
      const route = await prisma.transportRoute.update({
        where: { id: parseInt(id) },
        data: { name, origin, destination, distance: distance ? parseFloat(distance) : undefined, price: price ? parseFloat(price) : undefined, schedule },
      });
      return res.status(200).json(route);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update route' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.transportRoute.delete({ where: { id: parseInt(id) } });
      return res.status(200).json({ message: 'Route deleted' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete route' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
