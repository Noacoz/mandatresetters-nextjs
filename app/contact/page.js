/**
 * Contact Page
 */

import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Mandatresetters Holdings',
  description: 'Get in touch with our team for investment opportunities and partnerships.',
};

export default function Contact() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <div className="breadcrumb">
            <a href="/">Home</a> <span>/</span> <span>Contact</span>
          </div>
        </div>
      </section>

      <section className="page-content" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>
                We welcome inquiries from potential investment partners, portfolio companies, and
                business leaders interested in exploring opportunities with Mandatresetters Holdings.
              </p>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h3>Headquarters</h3>
                  <p>1234 Financial District<br />San Francisco, CA 94111</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h3>Phone</h3>
                  <p>+1 (415) 555-2020</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h3>Email</h3>
                  <p>contact@mandatresetters.com</p>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
