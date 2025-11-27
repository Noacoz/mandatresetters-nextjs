/**
 * Header Component - Global navigation
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href) => pathname === href;

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          Mandatresetters<span>Holdings</span>
        </div>

        <button
          className="mobile-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <nav>
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <li>
              <Link
                href="/"
                className={isActive('/') ? 'active' : ''}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={isActive('/about') ? 'active' : ''}
                onClick={closeMenu}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/businesses"
                className={isActive('/businesses') ? 'active' : ''}
                onClick={closeMenu}
              >
                Businesses
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={isActive('/contact') ? 'active' : ''}
                onClick={closeMenu}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <Link href="/contact" className="invest-btn">
            Get In Touch
          </Link>
        </div>
      </div>
    </header>
  );
}
