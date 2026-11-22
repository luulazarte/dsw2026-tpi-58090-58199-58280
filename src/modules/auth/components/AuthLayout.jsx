import { Link } from 'react-router-dom';
import { ShieldIcon } from '../../shared/components/icons';

function AuthLayout({ bottomLink, children }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-med-primary-950 px-4 py-8 sm:p-6">
      <div className="flex flex-col items-center mb-8">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-3">
          <ShieldIcon className="w-8 h-8 text-med-primary-900" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          MedPortal
        </h1>
      </div>

      {children}

      {bottomLink && (
        <div className="mt-6 text-center">
          <Link
            to={bottomLink.to}
            className="text-xs text-med-primary-200 hover:text-white transition"
          >
            {bottomLink.label}
          </Link>
        </div>
      )}
    </div>
  );
}

export default AuthLayout;
