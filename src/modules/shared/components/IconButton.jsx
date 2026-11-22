const ICON_BUTTON_STYLES = {
  default:
    'text-med-primary-600 hover:bg-med-primary-50 hover:text-med-primary-900',
  danger: 'text-med-danger-text hover:bg-red-50',
};

function IconButton({
  label,
  variant = 'default',
  className = '',
  children,
  ...restProps
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className={`p-1.5 rounded-lg transition ${ICON_BUTTON_STYLES[variant] ?? ICON_BUTTON_STYLES.default} ${className}`}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default IconButton;
