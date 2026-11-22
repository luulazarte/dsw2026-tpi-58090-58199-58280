import { Link } from 'react-router-dom';

function PageHeader({ title, subtitle, breadcrumbs = [], actions }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        {breadcrumbs.length > 0 && (
          <p className="text-xs text-med-text-muted mb-2">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.label}>
                {index > 0 && <span className="mx-2">›</span>}
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-med-primary-900">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-med-text-sub">{crumb.label}</span>
                )}
              </span>
            ))}
          </p>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-text-main">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-med-text-sub mt-1">{subtitle}</p>
        )}
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-3">{actions}</div>
      )}
    </div>
  );
}

export default PageHeader;
