const timeInputClass =
  'border rounded-lg px-2.5 py-1.5 text-sm bg-white text-med-text-main focus:outline-none focus:ring-2 focus:ring-med-primary-600 disabled:bg-gray-100 disabled:text-med-text-muted';

function WeeklyScheduleTable({ weekDays, days, register, errors }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-med-primary-50/70 text-[11px] uppercase tracking-wider text-med-text-sub border-b border-med-border">
          <tr>
            <th className="px-5 py-3">Día</th>
            <th className="px-5 py-3">Estado</th>
            <th className="px-5 py-3">Entrada</th>
            <th className="px-5 py-3">Salida</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-med-border-subtle">
          {weekDays.map((day, index) => {
            const enabled = days[index].enabled;
            const endTimeError = errors.days?.[index]?.endTime?.message;

            return (
              <tr key={day}>
                <td className="px-5 py-3 font-semibold text-med-primary-900">
                  {day}
                </td>
                <td className="px-5 py-3">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-med-primary-900"
                      {...register(`days.${index}.enabled`)}
                    />
                    <span className="text-xs text-med-text-sub">
                      {enabled ? 'Activo' : 'Inactivo'}
                    </span>
                  </label>
                </td>
                <td className="px-5 py-3">
                  <input
                    type="time"
                    step="1800"
                    disabled={!enabled}
                    aria-label={`Entrada ${day}`}
                    className={`${timeInputClass} border-med-border`}
                    {...register(`days.${index}.startTime`)}
                  />
                </td>
                <td className="px-5 py-3">
                  <input
                    type="time"
                    step="1800"
                    disabled={!enabled}
                    aria-label={`Salida ${day}`}
                    className={`${timeInputClass} ${endTimeError ? 'border-red-400' : 'border-med-border'}`}
                    {...register(`days.${index}.endTime`, {
                      validate: (endTime, formValues) =>
                        !formValues.days[index].enabled ||
                        endTime > formValues.days[index].startTime ||
                        'La salida debe ser posterior a la entrada',
                    })}
                  />
                  {endTimeError && (
                    <p className="text-xs text-red-500 font-medium mt-1">
                      {endTimeError}
                    </p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default WeeklyScheduleTable;
