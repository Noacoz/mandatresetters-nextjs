import prisma from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: {
          bookings: true,
          rentalOrders: true,
        },
      });
      if (!user) return res.status(404).json({ error: 'User not found' });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { name, email, role } = req.body;
      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { name, email: email?.toLowerCase(), role },
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update user' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.user.delete({ where: { id: parseInt(id) } });
      return res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete user' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
