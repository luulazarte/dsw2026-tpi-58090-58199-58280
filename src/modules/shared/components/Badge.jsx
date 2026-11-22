const BADGE_STYLES = {
  primary: 'bg-med-primary-100 text-med-primary-700',
  success: 'bg-med-active-bg text-med-active-text',
  danger: 'bg-med-danger-bg text-med-danger-text',
  neutral: 'bg-slate-100 text-slate-700',
};

function Badge({
  variant = 'primary',
  withDot = false,
  className = '',
  children,
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${BADGE_STYLES[variant] ?? BADGE_STYLES.primary} ${className}`}
    >
      {withDot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export default Badge;
