/**
 * Business Card Component
 */
import Link from 'next/link';

export default function BusinessCard({ id, name, description, image, sector }) {
  const sectorColors = {
    Technology: '#1a2a44',
    Wellness: '#2d5a27',
    Engineering: '#b87333',
    Mobility: '#2d5a27',
  };

  return (
    <div className="card">
      <div className="card-img" style={{ backgroundColor: sectorColors[sector] || '#1a2a44' }}>
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <span>{name}</span>
        )}
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <p>{description}</p>
        <Link href={`/businesses/${id}`} className="card-link">
          Explore <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
}
