/**
 * API Route: Get All Businesses
 * GET /api/businesses
 */

const businessesData = [
  {
    id: 'novastream',
    name: 'NovaStream Solutions',
    sector: 'Technology',
    description: 'Enterprise software and digital transformation services.',
  },
  {
    id: 'vitalpath',
    name: 'VitalPath Wellness',
    sector: 'Wellness',
    description: 'Integrated wellness platforms and services.',
  },
  {
    id: 'electrocore',
    name: 'ElectroCore Engineering',
    sector: 'Engineering',
    description: 'Advanced electrical engineering and automation solutions.',
  },
  {
    id: 'academidrive',
    name: 'AcademiDrive Mobility',
    sector: 'Mobility',
    description: 'Safe and reliable school transportation services.',
  },
];

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sector } = req.query;

    let filtered = businessesData;

    if (sector) {
      filtered = businessesData.filter((b) => b.sector.toLowerCase() === sector.toLowerCase());
    }

    return res.status(200).json({ success: true, data: filtered });
  } catch (error) {
    console.error('Businesses API error:', error);
    return res.status(500).json({ error: 'Failed to fetch businesses' });
  }
}
