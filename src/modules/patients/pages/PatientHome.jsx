import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import useAuth from '../../auth/hook/useAuth';
import { getSpecialties } from '../../specialties/services/specialtiesService';
import {
  getDoctorAvailabilities,
  getDoctors,
} from '../../doctors/services/doctorsService';
import { createAppointment } from '../../appointments/services/appointmentsService';

const DAY_NAMES = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];

const selectClass =
  'w-full appearance-none px-3.5 py-2.5 text-sm bg-white border border-med-border rounded-lg text-med-text-main focus:outline-none focus:ring-2 focus:ring-med-primary-600 pr-10 cursor-pointer';

// Convierte una fecha en el texto "2026-11-23" (así viene slotDate del backend)
const toDateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

// Devuelve los 6 días (lunes a sábado) de la semana actual + weekOffset semanas
const getWeekDays = (weekOffset) => {
  const today = new Date();
  const mondayOffset = (today.getDay() + 6) % 7;
  const monday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - mondayOffset + weekOffset * 7
  );

  return Array.from(
    { length: 6 },
    (_, i) =>
      new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i)
  );
};

const formatLongDate = (dateKey) => {
  const [year, month, day] = dateKey.split('-').map(Number);

  return new Date(year, month - 1, day).toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

// El backend manda la hora como "08:30:00": nos quedamos con "08:30"
const formatTime = (time) => time.slice(0, 5);

// ¿El turno todavía no pasó? (no se permiten turnos en el pasado)
const isFutureSlot = (slot) => {
  const [year, month, day] = slot.slotDate.slice(0, 10).split('-').map(Number);
  const [hours, minutes] = slot.startTime.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes) > new Date();
};

function PatientHome() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Datos que vienen del backend
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState([]);

  // Lo que eligió el paciente
  const [specialtyId, setSpecialtyId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reason, setReason] = useState('');

  // Estado de la pantalla
  const [weekOffset, setWeekOffset] = useState(0);
  const [mobileDayIndex, setMobileDayIndex] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [reasonError, setReasonError] = useState('');
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);

  // Al abrir la pantalla traemos especialidades y médicos
  useEffect(() => {
    const loadData = async () => {
      const [specialtiesResult, doctorsResult] = await Promise.all([
        getSpecialties({ pageSize: 100 }),
        getDoctors({ pageSize: 100 }),
      ]);

      if (specialtiesResult.error || doctorsResult.error) {
        setErrorMessage(specialtiesResult.error || doctorsResult.error);

        return;
      }

      setSpecialties(specialtiesResult.data.data);
      setDoctors(doctorsResult.data.data);
    };

    loadData();
  }, []);

  // Médicos de la especialidad elegida (el filtro lo hacemos acá)
  const doctorsOfSpecialty = doctors.filter(
    (doc) => doc.speciality?.specialityId === specialtyId
  );
  const currentDoctor = doctors.find((doc) => doc.id === doctorId);

  const weekDays = getWeekDays(weekOffset);
  const mobileDay = weekDays[mobileDayIndex];

  const slotsOfDay = (date) =>
    slots
      .filter((slot) => slot.slotDate.slice(0, 10) === toDateKey(date))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const weekLabel = `${weekDays[0].getDate()} al ${weekDays[5].getDate()} de ${weekDays[5].toLocaleDateString('es-AR', { month: 'long' })}`;

  const handleSpecialtyChange = (e) => {
    setSpecialtyId(e.target.value);
    setDoctorId('');
    setSlots([]);
    setSelectedSlot(null);
    setHasSearched(false);
  };

  const handleDoctorChange = (e) => {
    setDoctorId(e.target.value);
    setSlots([]);
    setSelectedSlot(null);
    setHasSearched(false);
  };

  const loadSlots = async () => {
    setIsLoadingSlots(true);
    const { data, error } = await getDoctorAvailabilities(doctorId);

    setIsLoadingSlots(false);

    if (error) {
      setErrorMessage(error);

      return;
    }

    // Solo mostramos los turnos libres que todavía no pasaron
    setSlots(
      data.filter((slot) => slot.status === 'AVAILABLE' && isFutureSlot(slot))
    );
    setHasSearched(true);
  };

  const handleSearch = async () => {
    setErrorMessage('');

    if (!doctorId) {
      setErrorMessage('Seleccioná una especialidad y un doctor.');

      return;
    }

    setSelectedSlot(null);
    setWeekOffset(0);
    setMobileDayIndex(0);
    await loadSlots();
  };

  const changeWeek = (step) => {
    setWeekOffset(weekOffset + step);
    setMobileDayIndex(0);
  };

  const handleConfirm = async () => {
    setErrorMessage('');
    setReasonError('');

    if (!selectedSlot) {
      setErrorMessage('Elegí un horario disponible.');

      return;
    }

    if (reason.trim().length < 5) {
      setReasonError('El motivo debe tener al menos 5 caracteres.');

      return;
    }

    setIsBooking(true);
    const { data, error } = await createAppointment({
      doctorId,
      availabilitySlotId: selectedSlot.id,
      patient: { dni: Number(user.dni) },
      reason: reason.trim(),
    });

    setIsBooking(false);

    if (error) {
      setErrorMessage(error);
      // Si otro paciente lo reservó antes, refrescamos los horarios
      setSelectedSlot(null);
      await loadSlots();

      return;
    }

    setConfirmedAppointment(data);
    setSlots(slots.filter((slot) => slot.id !== selectedSlot.id));
    setSelectedSlot(null);
    setReason('');
  };

  const renderSlotButton = (slot, extraClass = '') => {
    const isSelected = selectedSlot?.id === slot.id;

    return (
      <button
        key={slot.id}
        type="button"
        onClick={() => setSelectedSlot(slot)}
        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${extraClass} ${isSelected
            ? 'bg-emerald-400 text-white border-emerald-400 shadow-sm'
            : 'bg-white border-med-border text-med-primary-900 hover:border-med-primary-600 hover:bg-med-primary-50/50'
          }`}
      >
        {formatTime(slot.startTime)}
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* 1. Selector de Especialidad y Doctor */}
      <Card className="p-6 sm:p-7">
        <div className="mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-primary-900">
            Reservar Turno Médico
          </h1>
          <p className="text-xs sm:text-sm text-med-text-sub mt-1">
            Seleccione la especialidad y el profesional para continuar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Especialidad */}
          <div className="md:col-span-5 flex flex-col gap-1.5">
            <label
              htmlFor="specialty"
              className="text-xs font-semibold text-med-text-sub"
            >
              Seleccionar Especialidad
            </label>
            <div className="relative">
              <select
                id="specialty"
                value={specialtyId}
                onChange={handleSpecialtyChange}
                className={selectClass}
              >
                <option value="">Seleccione especialidad</option>
                {specialties.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-med-text-muted">
                ▼
              </span>
            </div>
          </div>

          {/* Doctor */}
          <div className="md:col-span-4 flex flex-col gap-1.5">
            <label
              htmlFor="doctor"
              className="text-xs font-semibold text-med-text-sub"
            >
              Seleccionar Doctor
            </label>
            <div className="relative">
              <select
                id="doctor"
                value={doctorId}
                onChange={handleDoctorChange}
                disabled={!specialtyId}
                className={`${selectClass} disabled:bg-gray-100`}
              >
                <option value="">
                  {specialtyId && doctorsOfSpecialty.length === 0
                    ? 'No hay doctores en esta especialidad'
                    : 'Seleccione doctor'}
                </option>
                {doctorsOfSpecialty.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-med-text-muted">
                ▼
              </span>
            </div>
          </div>

          {/* Botón Buscar Disponibilidad */}
          <div className="md:col-span-3">
            <Button
              type="button"
              onClick={handleSearch}
              disabled={isLoadingSlots}
              className="w-full flex items-center justify-center gap-2 py-2.5"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>
                {isLoadingSlots ? 'Buscando...' : 'Buscar Disponibilidad'}
              </span>
            </Button>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 text-center">
            {errorMessage}
          </div>
        )}
      </Card>

      {/* 2. Información del Doctor seleccionado */}
      {currentDoctor && (
        <Card className="p-5 sm:p-6 flex items-center gap-4 border-med-border">
          <div className="relative shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-med-primary-100 flex items-center justify-center text-3xl border border-med-primary-200">
              👨‍⚕️
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
          </div>

          <div className="overflow-hidden">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-med-primary-900">
                {currentDoctor.name}
              </h2>
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-med-primary-100 text-med-primary-700">
                Matrícula {currentDoctor.licenseNumber}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-med-primary-700 mt-0.5">
              {currentDoctor.speciality?.name}
            </p>
          </div>
        </Card>
      )}

      {/* 3. Selector semanal de turnos (aparece después de buscar) */}
      {hasSearched && (
        <Card className="p-5 sm:p-6 border-med-border">
          {/* Cabecera: semana y leyenda */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-med-border-subtle">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => changeWeek(-1)}
                disabled={weekOffset === 0}
                className="p-1 rounded-md border border-med-border hover:bg-gray-50 text-med-text-sub transition disabled:opacity-40"
              >
                ‹
              </button>
              <span className="font-bold text-sm sm:text-base text-med-primary-900">
                Semana del {weekLabel}
              </span>
              <button
                type="button"
                onClick={() => changeWeek(1)}
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

          {/* A) Vista de escritorio: una columna por día */}
          <div className="hidden sm:grid sm:grid-cols-6 gap-3 pt-5">
            {weekDays.map((day) => {
              const daySlots = slotsOfDay(day);

              return (
                <div
                  key={toDateKey(day)}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="text-center">
                    <span className="text-[11px] font-bold text-med-text-sub uppercase">
                      {DAY_NAMES[day.getDay()]}
                    </span>
                    <p className="text-xl font-bold text-med-primary-900 leading-tight">
                      {day.getDate()}
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    {daySlots.length > 0 ? (
                      daySlots.map((slot) => renderSlotButton(slot, 'w-full'))
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

          {/* B) Vista mobile: días en fila + horarios del día elegido */}
          <div className="block sm:hidden pt-4 space-y-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {weekDays.map((day, index) => {
                const isActive = index === mobileDayIndex;

                return (
                  <button
                    key={toDateKey(day)}
                    type="button"
                    onClick={() => setMobileDayIndex(index)}
                    className={`flex-1 min-w-[56px] py-2.5 px-2 rounded-xl text-center border transition-all ${isActive
                        ? 'bg-med-primary-900 text-white border-med-primary-900 shadow-sm'
                        : 'bg-white border-med-border text-med-text-main hover:bg-gray-50'
                      }`}
                  >
                    <span className="block text-[10px] font-bold uppercase">
                      {DAY_NAMES[day.getDay()]}
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
              {slotsOfDay(mobileDay).length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {slotsOfDay(mobileDay).map((slot) => renderSlotButton(slot))}
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
      )}

      {/* 4. Resumen, motivo y confirmación */}
      {selectedSlot && (
        <div className="bg-med-primary-50 border border-med-primary-200/60 rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
          <div className="border-l-4 border-med-primary-900 pl-3.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-med-text-sub">
              Resumen de Selección
            </span>
            <p className="text-base sm:text-lg font-bold text-med-primary-900 mt-0.5 capitalize">
              📅 {formatLongDate(selectedSlot.slotDate.slice(0, 10))},{' '}
              {formatTime(selectedSlot.startTime)} HS
            </p>
            <p className="text-xs text-med-text-sub mt-0.5">
              {currentDoctor?.name} • {currentDoctor?.speciality?.name} •
              Duración: 30 min
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="reason"
              className="text-xs font-semibold text-med-text-main"
            >
              Motivo de la consulta
            </label>
            <textarea
              id="reason"
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ej. Control anual, dolor de cabeza frecuente..."
              className={`w-full border rounded-lg px-3.5 py-2.5 text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-med-primary-600 ${reasonError ? 'border-red-400' : 'border-med-border'}`}
            />
            {reasonError && (
              <p className="text-xs text-red-500 font-medium">{reasonError}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={isBooking}
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl shadow-md text-sm"
            >
              <span>{isBooking ? 'Reservando...' : 'Confirmar Turno'}</span>
              <svg
                className="w-5 h-5 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Button>
          </div>
        </div>
      )}

      {/* Modal de turno confirmado */}
      {confirmedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-bold text-med-primary-900">
              ¡Turno Confirmado con Éxito!
            </h3>
            <p className="text-xs text-med-text-sub mt-2 leading-relaxed">
              Tu turno con{' '}
              <strong className="text-med-text-main">
                {confirmedAppointment.doctorName}
              </strong>{' '}
              quedó reservado para el{' '}
              <strong className="text-med-text-main">
                {formatLongDate(confirmedAppointment.date.slice(0, 10))} a las{' '}
                {formatTime(confirmedAppointment.startTime)} hs
              </strong>
              .
            </p>

            <div className="mt-5 p-3.5 bg-med-primary-50 border border-med-primary-200/60 rounded-xl text-xs text-med-primary-900 text-left space-y-1">
              <p>
                <strong>Especialidad:</strong>{' '}
                {confirmedAppointment.specialtyName}
              </p>
              <p>
                <strong>Paciente:</strong> DNI {user?.dni}
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button
                className="w-full text-xs py-2.5"
                onClick={() => navigate('/appointments')}
              >
                Ver Mis Turnos
              </Button>
              <Button
                variant="secondary"
                className="w-full text-xs py-2.5"
                onClick={() => setConfirmedAppointment(null)}
              >
                Reservar Otro
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientHome;