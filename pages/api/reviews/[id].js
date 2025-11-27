export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const reviewId = parseInt(id);

    if (req.method === 'GET') {
      // Would fetch from database in production
      return res.status(404).json({ error: 'Review not found' });
    }

    if (req.method === 'PUT') {
      const { rating, comment } = req.body;

      const review = {
        id: reviewId,
        rating: parseInt(rating),
        comment: comment || '',
        updatedAt: new Date(),
      };

      return res.status(200).json(review);
    }

    if (req.method === 'DELETE') {
      return res.status(200).json({ message: 'Review deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Review detail API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
