/**
 * Businesses (Portfolio) Page
 */

import BusinessCard from '@/components/BusinessCard';

export const metadata = {
  title: 'Our Business Portfolio | Mandatresetters Holdings',
  description: 'Explore our portfolio of leading companies across technology, wellness, engineering, and mobility.',
};

const businessesData = [
  {
    id: 'novastream',
    name: 'NovaStream Solutions',
    sector: 'Technology',
    description: 'Enterprise software and digital transformation services driving innovation across industries.',
  },
  {
    id: 'vitalpath',
    name: 'VitalPath Wellness',
    sector: 'Wellness',
    description: 'Integrated wellness platforms and services promoting holistic health and preventive care.',
  },
  {
    id: 'electrocore',
    name: 'ElectroCore Engineering',
    sector: 'Engineering',
    description: 'Advanced electrical engineering and automation solutions for industrial and commercial applications.',
  },
  {
    id: 'academidrive',
    name: 'AcademiDrive Mobility',
    sector: 'Mobility',
    description: 'Safe and reliable school transportation services with modern fleet management solutions.',
  },
];

export default function Businesses() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Our Business Portfolio</h1>
          <div className="breadcrumb">
            <a href="/">Home</a> <span>/</span> <span>Businesses</span>
          </div>
        </div>
      </section>

      <section className="page-content" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="section-header">
            <h2>Our Strategic Businesses</h2>
            <p>
              Leading companies across technology, wellness, engineering, and mobility sectors, all
              part of the Mandatresetters Holdings portfolio.
            </p>
          </div>

          <div className="grid grid-4">
            {businessesData.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
