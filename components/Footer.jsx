/**
 * Footer Component - Global footer
 */
'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>Mandatresetters Holdings</h3>
            <p>
              Building sustainable value through strategic investments and
              operational excellence across diverse industry sectors.
            </p>
            <div className="social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/businesses">Our Businesses</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Our Businesses</h3>
            <ul className="footer-links">
              <li>
                <Link href="/businesses/novastream">NovaStream Solutions</Link>
              </li>
              <li>
                <Link href="/businesses/vitalpath">VitalPath Wellness</Link>
              </li>
              <li>
                <Link href="/businesses/electrocore">ElectroCore Engineering</Link>
              </li>
              <li>
                <Link href="/businesses/academidrive">AcademiDrive Mobility</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Legal</h3>
            <ul className="footer-links">
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms of Use</Link>
              </li>
              <li>
                <Link href="#">Cookie Policy</Link>
              </li>
              <li>
                <Link href="#">Compliance</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Mandatresetters Holdings Company. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <Link href="#">Sitemap</Link>
            <Link href="#">Accessibility</Link>
            <Link href="#">Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
