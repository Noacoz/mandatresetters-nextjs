import { db } from '@/lib/db';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const payments = await db.payment.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(payments);
    }

    if (req.method === 'POST') {
      const { transactionId, amount, status, paymentType, referenceId } = req.body;

      if (!transactionId || !amount) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const payment = await db.payment.create({
        data: {
          transactionId,
          amount: parseFloat(amount),
          status: status || 'pending',
          paymentType: paymentType || 'card',
          referenceId: referenceId || null,
        },
      });

      return res.status(201).json(payment);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Payments API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
