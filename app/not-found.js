/**
 * 404 Not Found Page
 */

export default function NotFound() {
  return (
    <section className="page-header">
      <div className="container">
        <h1 style={{ fontSize: '4rem', marginBottom: '20px' }}>404</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Page Not Found</p>
        <p style={{ marginBottom: '30px' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/" className="btn btn-primary">
          <i className="fas fa-home"></i> Go Home
        </a>
      </div>
    </section>
  );
}
