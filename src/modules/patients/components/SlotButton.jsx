import { formatTime } from '../../shared/helpers/calendar';

function SlotButton({ startTime, isSelected, onSelect, className = '' }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${className} ${
        isSelected
          ? 'bg-emerald-400 text-white border-emerald-400 shadow-sm'
          : 'bg-white border-med-border text-med-primary-900 hover:border-med-primary-600 hover:bg-med-primary-50/50'
      }`}
    >
      {formatTime(startTime)}
    </button>
  );
}

export default SlotButton;
