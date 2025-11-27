/**
 * Individual Business Page (Dynamic Route)
 */

const businessDetails = {
  novastream: {
    id: 'novastream',
    name: 'NovaStream Solutions',
    sector: 'Technology',
    color: '#1a2a44',
    title: 'Digital Transformation Partners',
    description: 'NovaStream Solutions provides enterprise-grade software and digital transformation services that help businesses adapt, innovate, and thrive in the digital age.',
    fullDescription: 'Our comprehensive suite of solutions includes cloud migration, data analytics, custom software development, and digital workflow optimization tailored to each client\'s unique needs.',
    stats: [
      { number: '450+', label: 'Enterprise Clients' },
      { number: '92%', label: 'Client Retention' },
      { number: '$180M', label: 'Annual Revenue' },
    ],
    features: [
      { icon: 'fa-cloud', title: 'Cloud Solutions', desc: 'End-to-end cloud migration, management, and optimization services across AWS, Azure, and GCP platforms.' },
      { icon: 'fa-chart-bar', title: 'Data & Analytics', desc: 'Advanced analytics, business intelligence, and AI/ML solutions to transform data into actionable insights.' },
      { icon: 'fa-mobile-alt', title: 'Digital Experience', desc: 'Custom web and mobile applications designed to enhance customer engagement and operational efficiency.' },
      { icon: 'fa-lock', title: 'Cybersecurity', desc: 'Comprehensive security solutions to protect digital assets and ensure regulatory compliance.' },
    ],
  },
  vitalpath: {
    id: 'vitalpath',
    name: 'VitalPath Wellness',
    sector: 'Wellness',
    color: '#2d5a27',
    title: 'Holistic Health & Wellness',
    description: 'VitalPath Wellness offers integrated wellness solutions that empower individuals and organizations to achieve optimal health.',
    fullDescription: 'Our comprehensive approach addresses physical, mental, and emotional wellbeing through a combination of digital platforms, clinical services, and community engagement.',
    stats: [
      { number: '75K+', label: 'Members Served' },
      { number: '120+', label: 'Wellness Centers' },
      { number: '$95M', label: 'Annual Revenue' },
    ],
    features: [
      { icon: 'fa-briefcase', title: 'Corporate Wellness', desc: 'Customized workplace wellness programs that improve employee health, engagement, and productivity.' },
      { icon: 'fa-brain', title: 'Mental Health', desc: 'Comprehensive mental health services including counseling, stress management, and resilience training.' },
      { icon: 'fa-apple-alt', title: 'Nutrition & Fitness', desc: 'Personalized nutrition plans, fitness programs, and lifestyle coaching for sustainable health outcomes.' },
      { icon: 'fa-mobile-alt', title: 'Digital Wellness Platform', desc: 'Integrated technology platform connecting members with wellness resources and tracking progress.' },
    ],
  },
  electrocore: {
    id: 'electrocore',
    name: 'ElectroCore Engineering',
    sector: 'Engineering',
    color: '#b87333',
    title: 'Advanced Electrical Engineering & Automation',
    description: 'ElectroCore Engineering specializes in cutting-edge electrical engineering solutions, industrial automation, and smart infrastructure systems.',
    fullDescription: 'Our team of certified engineers and technicians delivers innovative solutions that optimize energy efficiency, enhance operational performance, and ensure regulatory compliance across diverse sectors.',
    stats: [
      { number: '250+', label: 'Projects Completed' },
      { number: '40+', label: 'Certified Engineers' },
      { number: '$65M', label: 'Annual Revenue' },
    ],
    features: [
      { icon: 'fa-bolt', title: 'Power Systems', desc: 'Design, installation, and maintenance of commercial and industrial electrical power systems.' },
      { icon: 'fa-cogs', title: 'Industrial Automation', desc: 'Custom automation solutions, PLC programming, and control systems for manufacturing facilities.' },
      { icon: 'fa-solar-panel', title: 'Renewable Energy', desc: 'Solar power systems, energy storage solutions, and sustainable energy infrastructure.' },
      { icon: 'fa-building', title: 'Smart Buildings', desc: 'Integrated building management systems, lighting controls, and energy optimization solutions.' },
    ],
  },
  academidrive: {
    id: 'academidrive',
    name: 'AcademiDrive Mobility',
    sector: 'Mobility',
    color: '#2d5a27',
    title: 'Safe & Reliable School Transportation',
    description: 'AcademiDrive Mobility provides comprehensive school transportation services with a focus on safety, reliability, and modern fleet management.',
    fullDescription: 'Our advanced tracking systems, certified drivers, and rigorous safety protocols ensure peace of mind for parents and school administrators while delivering efficient transportation services.',
    stats: [
      { number: '15K+', label: 'Students Transported' },
      { number: '350+', label: 'Vehicle Fleet' },
      { number: '$42M', label: 'Annual Revenue' },
    ],
    features: [
      { icon: 'fa-bus', title: 'School Bus Services', desc: 'Daily school transportation with modern, safety-compliant buses and certified drivers.' },
      { icon: 'fa-map-marked-alt', title: 'Route Optimization', desc: 'Smart routing algorithms that minimize travel time and maximize efficiency for school districts.' },
      { icon: 'fa-shield-alt', title: 'Safety & Compliance', desc: 'Comprehensive safety protocols, driver training, and regulatory compliance management.' },
      { icon: 'fa-mobile-alt', title: 'Parent Communication', desc: 'Real-time tracking and communication apps that keep parents informed about student transportation.' },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(businessDetails).map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const business = businessDetails[params.id];
  return {
    title: `${business?.name} | Mandatresetters Holdings`,
    description: business?.description || 'Portfolio business details',
  };
}

export default function BusinessDetail({ params }) {
  const business = businessDetails[params.id];

  if (!business) {
    return (
      <section className="page-header">
        <div className="container">
          <h1>Business Not Found</h1>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>{business.name}</h1>
          <div className="breadcrumb">
            <a href="/">Home</a> <span>/</span> <a href="/businesses">Businesses</a> <span>/</span> <span>{business.name}</span>
          </div>
        </div>
      </section>

      <section className="page-content" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="subsidiary-hero">
            <div className="subsidiary-content">
              <h2>{business.title}</h2>
              <p>{business.description}</p>
              <p>{business.fullDescription}</p>
              <a href="/contact" className="btn btn-primary">
                Contact {business.name}
              </a>
            </div>
            <div className="about-stats">
              {business.stats.map((stat, idx) => (
                <div key={idx} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <section className="section">
            <div className="section-header">
              <h2>Our {business.sector === 'Technology' ? 'Technology' : business.sector} Services</h2>
              <p>
                {business.sector === 'Technology' && 'Comprehensive digital services designed to drive efficiency, innovation, and competitive advantage.'}
                {business.sector === 'Wellness' && 'Comprehensive health and wellness solutions designed for individuals, employers, and healthcare providers.'}
                {business.sector === 'Engineering' && 'Comprehensive electrical engineering and automation solutions for modern infrastructure challenges.'}
                {business.sector === 'Mobility' && 'Comprehensive mobility solutions designed specifically for educational institutions.'}
              </p>
            </div>
            <div className="grid grid-2">
              {business.features.map((feature, idx) => (
                <div key={idx} className="card">
                  <div className="card-content">
                    <div className="value-icon" style={{ marginBottom: '20px' }}>
                      <i className={`fas ${feature.icon}`}></i>
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
