const VARIANT_STYLES = {
  error: 'bg-red-50 border-red-200 text-red-600',
  success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  info: 'bg-med-primary-50 border-med-primary-100 text-med-primary-900',
};

function Alert({ variant = 'error', className = '', children }) {
  if (!children) return null;

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={`p-3 border rounded-lg text-xs text-center ${VARIANT_STYLES[variant] ?? VARIANT_STYLES.info} ${className}`}
    >
      {children}
    </div>
  );
}

export default Alert;
