import { fieldBase, fieldState, labelClass } from '../styles/fieldClasses';

function Select({
  label,
  error = '',
  id,
  className = '',
  children,
  ...restProps
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={`${fieldBase} ${fieldState(error)} appearance-none pl-3.5 pr-10 cursor-pointer ${className}`}
          {...restProps}
        >
          {children}
        </select>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-med-text-muted">
          ▼
        </span>
      </div>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

export default Select;
