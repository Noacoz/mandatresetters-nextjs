/**
 * Root Layout - Global layout for all pages
 * Uses App Router (Next.js 14)
 */

import './layout.css';
import '../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Mandatresetters Holdings - Strategic Investment & Growth',
  description:
    'Mandatresetters Holdings is a strategic investment and growth firm focused on acquiring and scaling leading brands in technology, wellness, engineering, and mobility.',
  openGraph: {
    title: 'Mandatresetters Holdings - Strategic Investment & Growth',
    description:
      'Building sustainable value through strategic investments across diverse sectors.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
