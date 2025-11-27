/**
 * Hero Section Component
 */

export default function Hero({ title, subtitle, buttons = [] }) {
  return (
    <div className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="reveal-element">{title}</h1>
          <p className="reveal-element stagger-delay-1">{subtitle}</p>
          {buttons.length > 0 && (
            <div className="hero-btns">
              {buttons.map((btn, index) => (
                <a
                  key={index}
                  href={btn.href}
                  className={`btn ${btn.variant || 'btn-primary'} reveal-element stagger-delay-${index + 2}`}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
