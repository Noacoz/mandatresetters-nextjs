import prisma from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        include: {
          bookings: { select: { id: true } },
          rentalOrders: { select: { id: true } },
        },
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ error: 'Name, email, and password required' });
      }

      const user = await prisma.user.create({
        data: { name, email: email.toLowerCase(), password, role: role || 'customer' },
      });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create user' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
