import Card from '../../shared/components/Card';
import { getDayName, toDateKey } from '../../shared/helpers/calendar';
import SlotButton from './SlotButton';

function WeekSlotPicker({
  weekDays,
  weekLabel,
  canGoBack,
  onChangeWeek,
  getSlotsOfDay,
  selectedSlotId,
  onSelectSlot,
  mobileDay,
  mobileDayIndex,
  onSelectMobileDay,
}) {
  const renderSlots = (day, buttonClass) =>
    getSlotsOfDay(day).map((slot) => (
      <SlotButton
        key={slot.id}
        startTime={slot.startTime}
        isSelected={selectedSlotId === slot.id}
        onSelect={() => onSelectSlot(slot)}
        className={buttonClass}
      />
    ));

  const mobileSlots = getSlotsOfDay(mobileDay);

  return (
    <Card className="p-5 sm:p-6 border-med-border">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-med-border-subtle">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChangeWeek(-1)}
            disabled={!canGoBack}
            aria-label="Semana anterior"
            className="p-1 rounded-md border border-med-border hover:bg-gray-50 text-med-text-sub transition disabled:opacity-40"
          >
            ‹
          </button>
          <span className="font-bold text-sm sm:text-base text-med-primary-900">
            Semana del {weekLabel}
          </span>
          <button
            type="button"
            onClick={() => onChangeWeek(1)}
            aria-label="Semana siguiente"
            className="p-1 rounded-md border border-med-border hover:bg-gray-50 text-med-text-sub transition"
          >
            ›
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs text-med-text-sub">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-med-primary-900" />
            Disponible
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Seleccionado
          </span>
        </div>
      </div>

      <div className="hidden sm:grid sm:grid-cols-6 gap-3 pt-5">
        {weekDays.map((day) => {
          const hasSlots = getSlotsOfDay(day).length > 0;

          return (
            <div
              key={toDateKey(day)}
              className="flex flex-col items-center gap-3"
            >
              <div className="text-center">
                <span className="text-[11px] font-bold text-med-text-sub uppercase">
                  {getDayName(day)}
                </span>
                <p className="text-xl font-bold text-med-primary-900 leading-tight">
                  {day.getDate()}
                </p>
              </div>

              <div className="w-full flex flex-col gap-2">
                {hasSlots ? (
                  renderSlots(day, 'w-full')
                ) : (
                  <p className="text-xs text-med-text-muted text-center py-6">
                    Sin disponibilidad
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="block sm:hidden pt-4 space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {weekDays.map((day, index) => {
            const isActive = index === mobileDayIndex;

            return (
              <button
                key={toDateKey(day)}
                type="button"
                onClick={() => onSelectMobileDay(index)}
                className={`flex-1 min-w-[56px] py-2.5 px-2 rounded-xl text-center border transition-all ${
                  isActive
                    ? 'bg-med-primary-900 text-white border-med-primary-900 shadow-sm'
                    : 'bg-white border-med-border text-med-text-main hover:bg-gray-50'
                }`}
              >
                <span className="block text-[10px] font-bold uppercase">
                  {getDayName(day)}
                </span>
                <span className="block text-base font-extrabold">
                  {day.getDate()}
                </span>
              </button>
            );
          })}
        </div>

        <div>
          <span className="block text-xs font-bold text-med-text-sub mb-2.5">
            Horarios disponibles (bloques de 30 min)
          </span>
          {mobileSlots.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {renderSlots(mobileDay)}
            </div>
          ) : (
            <div className="p-6 bg-gray-50 border border-med-border rounded-xl text-center">
              <p className="text-xs text-med-text-muted">
                Sin disponibilidad para este día.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default WeekSlotPicker;
