import { useNavigate } from 'react-router-dom';
import DoctorProfileCard from '../../doctors/components/DoctorProfileCard';
import useBooking from '../hooks/useBooking';
import DoctorPicker from '../components/DoctorPicker';
import WeekSlotPicker from '../components/WeekSlotPicker';
import BookingSummary from '../components/BookingSummary';
import BookingConfirmationModal from '../components/BookingConfirmationModal';

function PatientHome() {
  const navigate = useNavigate();
  const booking = useBooking();
  const { currentDoctor, selectedSlot, week } = booking;

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <DoctorPicker
        specialties={booking.specialties}
        doctors={booking.doctorsOfSpecialty}
        specialtyId={booking.specialtyId}
        doctorId={booking.doctorId}
        onSpecialtyChange={booking.selectSpecialty}
        onDoctorChange={booking.selectDoctor}
        onSearch={booking.searchSlots}
        isSearching={booking.isLoadingSlots}
        errorMessage={booking.errorMessage}
      />

      {currentDoctor && (
        <DoctorProfileCard
          name={currentDoctor.name}
          specialtyName={currentDoctor.speciality?.name}
          licenseNumber={currentDoctor.licenseNumber}
        />
      )}

      {booking.hasSearched && (
        <WeekSlotPicker
          weekDays={week.weekDays}
          weekLabel={week.weekLabel}
          canGoBack={week.weekOffset > 0}
          onChangeWeek={week.changeWeek}
          getSlotsOfDay={booking.getSlotsOfDay}
          selectedSlotId={selectedSlot?.id}
          onSelectSlot={booking.selectSlot}
          mobileDay={week.mobileDay}
          mobileDayIndex={week.mobileDayIndex}
          onSelectMobileDay={week.setMobileDayIndex}
        />
      )}

      {selectedSlot && (
        <BookingSummary
          slotDate={selectedSlot.slotDate}
          startTime={selectedSlot.startTime}
          doctorName={currentDoctor?.name}
          specialtyName={currentDoctor?.speciality?.name}
          reason={booking.reason}
          reasonError={booking.reasonError}
          onReasonChange={booking.setReason}
          onConfirm={booking.confirmBooking}
          isBooking={booking.isBooking}
        />
      )}

      <BookingConfirmationModal
        appointment={booking.confirmedAppointment}
        patientDni={booking.patientDni}
        onClose={booking.clearConfirmation}
        onViewAppointments={() => navigate('/appointments')}
      />
    </div>
  );
}

export default PatientHome;
