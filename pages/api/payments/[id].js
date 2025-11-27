import { db } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const paymentId = parseInt(id);

    if (req.method === 'GET') {
      const payment = await db.payment.findUnique({
        where: { id: paymentId },
      });

      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }

      return res.status(200).json(payment);
    }

    if (req.method === 'PUT') {
      const { status, paymentType, referenceId } = req.body;

      const payment = await db.payment.update({
        where: { id: paymentId },
        data: {
          status: status || undefined,
          paymentType: paymentType || undefined,
          referenceId: referenceId || undefined,
        },
      });

      return res.status(200).json(payment);
    }

    if (req.method === 'DELETE') {
      await db.payment.delete({
        where: { id: paymentId },
      });

      return res.status(200).json({ message: 'Payment deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Payment detail API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
