/**
 * Home Page
 */

import Hero from '@/components/Hero';
import BusinessCard from '@/components/BusinessCard';

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

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Strategic Growth Through Visionary Investments"
        subtitle="Mandatresetters Holdings Company is a diversified investment firm building sustainable value across technology, wellness, engineering, and mobility sectors through strategic partnerships and operational excellence."
        buttons={[
          { href: '#portfolio', label: 'Explore Our Portfolio', variant: 'btn-primary' },
          { href: '/contact', label: 'Connect With Us', variant: 'btn-secondary' },
        ]}
      />

      {/* About Section */}
      <section id="about" className="section about" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="reveal-element">Our Strategic Approach</h2>
            <p className="reveal-element stagger-delay-1">
              We identify, acquire, and grow businesses with strong fundamentals and
              transformative potential across focused industry verticals.
            </p>
          </div>
          <div className="about-grid">
            <div className="about-content">
              <h2 className="reveal-element">
                Building Lasting Value Through Strategic Partnerships
              </h2>
              <p className="reveal-element stagger-delay-1">
                Founded in 2010, Mandatresetters Holdings Company has established itself as a
                premier holding company with a diversified portfolio of market-leading businesses.
                Our approach combines deep industry expertise with operational excellence to drive
                sustainable growth.
              </p>
              <p className="reveal-element stagger-delay-2">
                We focus on long-term value creation through strategic investments in companies
                with strong management teams, defensible market positions, and significant growth
                potential.
              </p>
              <a href="/about" className="btn btn-primary reveal-element stagger-delay-3">
                Our Story
              </a>
            </div>
            <div className="about-stats">
              <div className="stat-item reveal-element stagger-delay-1">
                <div className="stat-number">$2.4B</div>
                <div className="stat-label">Portfolio Value</div>
              </div>
              <div className="stat-item reveal-element stagger-delay-2">
                <div className="stat-number">22+</div>
                <div className="stat-label">Companies</div>
              </div>
              <div className="stat-item reveal-element stagger-delay-3">
                <div className="stat-number">12</div>
                <div className="stat-label">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section portfolio" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="reveal-element">Our Business Portfolio</h2>
            <p className="reveal-element stagger-delay-1">
              Diverse investments across high-growth sectors with synergistic operational
              capabilities.
            </p>
          </div>
          <div className="grid grid-4">
            {businessesData.map((business, index) => (
              <div key={business.id} className={`reveal-element stagger-delay-${index}`}>
                <BusinessCard {...business} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section values" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="reveal-element">Our Investment Philosophy</h2>
            <p className="reveal-element stagger-delay-1">
              Guiding principles that shape our strategic decisions and partnership approach.
            </p>
          </div>
          <div className="values-grid">
            <div className="value-card reveal-element">
              <div className="value-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Sustainable Growth</h3>
              <p>Focus on long-term value creation through strategic investments and operational excellence.</p>
            </div>
            <div className="value-card reveal-element stagger-delay-1">
              <div className="value-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Partnership Focus</h3>
              <p>Collaborative approach with management teams to drive innovation and market expansion.</p>
            </div>
            <div className="value-card reveal-element stagger-delay-2">
              <div className="value-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Risk Management</h3>
              <p>Disciplined investment process with rigorous due diligence and portfolio diversification.</p>
            </div>
            <div className="value-card reveal-element stagger-delay-3">
              <div className="value-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>ESG Integration</h3>
              <p>Commitment to environmental, social, and governance principles across all investments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="reveal-element">Our Partners' Success Stories</h2>
            <p className="reveal-element stagger-delay-1">
              Hear from the leaders of our portfolio companies about their growth journey with
              Mandatresetters Holdings.
            </p>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-item reveal-element">
              <p className="quote">
                "Mandatresetters Holdings provided strategic capital and operational expertise that
                accelerated our market penetration by 300%. A truly invaluable partner."
              </p>
              <h4 className="client-name">Eleanor Vance</h4>
              <p className="client-title">CEO, NovaStream Technologies</p>
            </div>
            <div className="testimonial-item reveal-element stagger-delay-1">
              <p className="quote">
                "Their deep understanding of consumer wellness was crucial. The acquisition and
                integration into their portfolio was seamless and highly professional."
              </p>
              <h4 className="client-name">Marcus Bell</h4>
              <p className="client-title">Founder, VitalPath Wellness</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2 className="reveal-element">Partner With Us</h2>
          <p className="reveal-element stagger-delay-1">
            Explore investment opportunities or discuss how we can help scale your business through
            our strategic resources and operational expertise.
          </p>
          <a href="/contact" className="btn btn-primary reveal-element stagger-delay-2">
            Get In Touch
          </a>
        </div>
      </section>

      <script>
        {`
          // Reveal elements on scroll
          const revealElements = document.querySelectorAll('.reveal-element');
          
          const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
              }
            });
          }, { threshold: 0.1 });
          
          revealElements.forEach(element => {
            revealObserver.observe(element);
          });
        `}
      </script>
    </>
  );
}
