export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumb mb-6">
      {items.map((item, idx) => (
        <span key={idx}>
          {item.href ? (
            <a href={item.href} className="text-blue-600 hover:underline">
              {item.label}
            </a>
          ) : (
            <span className="text-gray-700">{item.label}</span>
          )}
          {idx < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
}
