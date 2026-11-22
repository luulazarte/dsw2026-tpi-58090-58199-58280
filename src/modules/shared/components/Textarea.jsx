import { fieldBase, fieldState, labelClass } from '../styles/fieldClasses';

function Textarea({ label, error = '', id, className = '', ...restProps }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`${fieldBase} ${fieldState(error)} px-3.5 resize-none ${className}`}
        {...restProps}
      />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

export default Textarea;
