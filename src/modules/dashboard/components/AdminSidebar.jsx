import { NavLink } from 'react-router-dom';
import {
  BriefcaseIcon,
  GridIcon,
  LogoutIcon,
  PlusSquareIcon,
  UserIcon,
  UserSearchIcon,
} from '../../shared/components/icons';

const ADMIN_NAV_ITEMS = [
  {
    to: '/admin/home',
    label: 'Tablero',
    icon: <GridIcon className="w-5 h-5" strokeWidth={1.75} />,
  },
  {
    to: '/admin/doctors',
    label: 'Doctores',
    icon: <BriefcaseIcon className="w-5 h-5" strokeWidth={1.75} />,
  },
  {
    to: '/admin/specialties',
    label: 'Especialidades',
    icon: <PlusSquareIcon className="w-5 h-5" strokeWidth={1.75} />,
  },
  {
    to: '/admin/patients',
    label: 'Búsqueda de Pacientes',
    icon: <UserSearchIcon className="w-5 h-5" strokeWidth={1.75} />,
  },
];

function AdminSidebar({ isOpen, userEmail, onNavigate, onLogout }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-med-border flex flex-col justify-between transition-transform duration-200 sm:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div>
        <div className="p-6 border-b border-med-border-subtle">
          <h2 className="text-base font-bold text-med-primary-900 leading-tight">
            Admin Portal
          </h2>
          <span className="text-xs font-medium text-med-text-muted">
            Healthcare Management
          </span>
        </div>

        <nav className="p-3 space-y-1">
          {ADMIN_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-med-primary-50 text-med-primary-900 border-r-4 border-med-primary-900'
                    : 'text-med-text-sub hover:bg-gray-50 hover:text-med-primary-900'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-med-border-subtle space-y-3">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-med-text-sub hover:text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <LogoutIcon className="w-4 h-4 text-med-text-muted" />
          <span>Cerrar Sesión</span>
        </button>

        <div className="pt-3 border-t border-med-border flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-med-primary-100 text-med-primary-900 flex items-center justify-center shrink-0">
            <UserIcon />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-med-text-main truncate">
              {userEmail}
            </p>
            <p className="text-[11px] text-med-text-muted truncate">
              Administrador
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
