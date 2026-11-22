import { fieldBase, fieldState, labelClass } from '../styles/fieldClasses';

function Input({
  label,
  error = '',
  leftIcon,
  rightSlot,
  id,
  className = '',
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
        {leftIcon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-med-text-muted">
            {leftIcon}
          </span>
        )}
        <input
          id={id}
          className={`${fieldBase} ${fieldState(error)} ${leftIcon ? 'pl-10' : 'pl-3.5'} ${rightSlot ? 'pr-10' : 'pr-3.5'} ${className}`}
          {...restProps}
        />
        {rightSlot && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightSlot}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

export default Input;
