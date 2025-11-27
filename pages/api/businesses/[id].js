/**
 * API Route: Get Single Business
 * GET /api/businesses/[id]
 */

const businessDetails = {
  novastream: {
    id: 'novastream',
    name: 'NovaStream Solutions',
    sector: 'Technology',
    title: 'Digital Transformation Partners',
    stats: {
      clients: '450+',
      retention: '92%',
      revenue: '$180M',
    },
  },
  vitalpath: {
    id: 'vitalpath',
    name: 'VitalPath Wellness',
    sector: 'Wellness',
    title: 'Holistic Health & Wellness',
    stats: {
      members: '75K+',
      centers: '120+',
      revenue: '$95M',
    },
  },
  electrocore: {
    id: 'electrocore',
    name: 'ElectroCore Engineering',
    sector: 'Engineering',
    title: 'Advanced Electrical Engineering',
    stats: {
      projects: '250+',
      engineers: '40+',
      revenue: '$65M',
    },
  },
  academidrive: {
    id: 'academidrive',
    name: 'AcademiDrive Mobility',
    sector: 'Mobility',
    title: 'School Transportation',
    stats: {
      students: '15K+',
      fleet: '350+',
      revenue: '$42M',
    },
  },
};

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    const business = businessDetails[id];

    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    return res.status(200).json({ success: true, data: business });
  } catch (error) {
    console.error('Business detail API error:', error);
    return res.status(500).json({ error: 'Failed to fetch business' });
  }
}
