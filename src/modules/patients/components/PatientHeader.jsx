import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BellIcon,
  BriefcaseIcon,
  MenuIcon,
  UserIcon,
} from '../../shared/components/icons';

const PATIENT_NAV_ITEMS = [
  { to: '/', label: 'Reservar Turno', end: true },
  { to: '/appointments', label: 'Mis Turnos', end: false },
];

const desktopLinkClass = ({ isActive }) =>
  `px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
    isActive
      ? 'bg-med-primary-900 text-white'
      : 'text-med-text-sub hover:bg-med-primary-50 hover:text-med-primary-900'
  }`;

const mobileLinkClass = ({ isActive }) =>
  `block px-3 py-2 rounded-lg text-sm font-semibold transition ${
    isActive
      ? 'bg-med-primary-900 text-white'
      : 'text-med-text-sub hover:bg-med-primary-50'
  }`;

function PatientHeader({ userEmail, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-xs border-b border-med-border sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6 sm:gap-8">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-med-primary-900 text-white flex items-center justify-center shadow-xs">
              <BriefcaseIcon />
            </div>
            <span className="text-lg font-bold text-med-primary-900 tracking-tight">
              Portal Salud
            </span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-2">
            {PATIENT_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={desktopLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            title="Notificaciones"
            aria-label="Notificaciones"
            className="hidden sm:flex p-2 rounded-lg text-med-text-muted hover:text-med-primary-900 hover:bg-gray-50 transition"
          >
            <BellIcon className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-med-border">
            <div className="w-8 h-8 rounded-full bg-med-primary-100 text-med-primary-900 flex items-center justify-center border border-med-primary-200">
              <UserIcon />
            </div>
            <span className="hidden sm:inline-block text-xs font-semibold text-med-text-main">
              {userEmail}
            </span>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="hidden sm:inline-flex text-xs font-semibold text-med-text-sub hover:text-red-600 px-2.5 py-1.5 rounded-lg border border-med-border hover:bg-red-50/40 transition"
          >
            Salir
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú"
            className="md:hidden p-1.5 rounded-lg border border-med-border text-med-text-sub hover:bg-gray-50"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-med-border px-4 py-3 bg-white space-y-2">
          {PATIENT_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setIsMenuOpen(false)}
              className={mobileLinkClass}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-med-border-subtle flex items-center justify-between">
            <span className="text-xs font-medium text-med-text-sub">
              Paciente: {userEmail}
            </span>
            <button
              type="button"
              onClick={onLogout}
              className="text-xs font-bold text-red-600"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default PatientHeader;
