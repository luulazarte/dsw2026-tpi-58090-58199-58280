const SIZE_STYLES = {
  sm: 'w-9 h-9 rounded-full text-lg',
  md: 'w-10 h-10 rounded-xl text-xl',
  lg: 'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl text-3xl border border-med-primary-200',
};

function DoctorAvatar({ size = 'md', showStatus = false }) {
  return (
    <div className="relative shrink-0">
      <div
        className={`bg-med-primary-100 flex items-center justify-center ${SIZE_STYLES[size] ?? SIZE_STYLES.md}`}
      >
        👨‍⚕️
      </div>
      {showStatus && (
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white bg-emerald-500" />
      )}
    </div>
  );
}

export default DoctorAvatar;
