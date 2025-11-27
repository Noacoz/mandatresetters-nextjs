/**
 * About Page
 */

export const metadata = {
  title: 'About Mandatresetters Holdings',
  description: 'Learn about our heritage, vision, and leadership team.',
};

export default function About() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>About Mandatresetters Holdings</h1>
          <div className="breadcrumb">
            <a href="/">Home</a> <span>/</span> <span>About Us</span>
          </div>
        </div>
      </section>

      <section className="page-content" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2>Our Heritage & Vision</h2>
              <p>
                Founded in 2010 by a team of seasoned investors and operators, Mandatresetters
                Holdings Company began with a simple yet powerful vision: to build a diversified
                portfolio of businesses that create lasting value for all stakeholders.
              </p>
              <p>
                Over the past decade, we've grown from a single investment in the consumer goods
                sector to a multi-billion dollar holding company with interests across technology,
                wellness, engineering, and mobility.
              </p>
              <p>
                Our unique approach combines financial discipline with operational expertise,
                allowing us to not only identify promising investment opportunities but also
                actively contribute to their growth and success.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">2010</div>
                <div className="stat-label">Year Founded</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">150+</div>
                <div className="stat-label">Team Members</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">8</div>
                <div className="stat-label">Countries of Operation</div>
              </div>
            </div>
          </div>

          <section className="section">
            <div className="section-header">
              <h2>Leadership Team</h2>
              <p>
                Experienced professionals with diverse backgrounds in investment, operations, and
                strategic growth.
              </p>
            </div>
            <div className="grid grid-3">
              <div className="card">
                <div className="card-img" style={{ backgroundColor: '#1a2a44' }}>CEO & Founder</div>
                <div className="card-content">
                  <h3>Jonathan Matthews</h3>
                  <p>Former partner at a leading private equity firm with over 20 years of investment experience.</p>
                </div>
              </div>
              <div className="card">
                <div className="card-img" style={{ backgroundColor: '#2d5a27' }}>COO</div>
                <div className="card-content">
                  <h3>Sarah Chen</h3>
                  <p>Operational leader with expertise in scaling businesses across multiple industries and markets.</p>
                </div>
              </div>
              <div className="card">
                <div className="card-img" style={{ backgroundColor: '#b87333' }}>CFO</div>
                <div className="card-content">
                  <h3>Michael Rodriguez</h3>
                  <p>Financial executive with extensive experience in corporate finance and capital markets.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
