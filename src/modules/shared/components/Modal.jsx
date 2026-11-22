function Modal({ isOpen, title, footer, className = '', children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div
        className={`w-full max-w-md bg-white rounded-2xl shadow-2xl ${className}`}
      >
        {title && (
          <div className="px-6 pt-6">
            <h2 className="text-lg font-bold text-med-primary-900">{title}</h2>
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
        {footer && (
          <div className="px-6 pb-6 flex justify-end gap-2">{footer}</div>
        )}
      </div>
    </div>
  );
}

export default Modal;
