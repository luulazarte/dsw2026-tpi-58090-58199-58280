import { MenuIcon } from '../../shared/components/icons';

function AdminMobileHeader({ onToggleMenu }) {
  return (
    <header className="sm:hidden bg-white border-b border-med-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-med-primary-900 text-white flex items-center justify-center font-bold text-xs">
          MC
        </div>
        <span className="font-bold text-sm text-med-primary-900">
          Medical Center
        </span>
      </div>
      <button
        type="button"
        onClick={onToggleMenu}
        aria-label="Abrir menú"
        className="p-1.5 rounded-lg border border-med-border text-med-text-sub"
      >
        <MenuIcon className="w-5 h-5" />
      </button>
    </header>
  );
}

export default AdminMobileHeader;
